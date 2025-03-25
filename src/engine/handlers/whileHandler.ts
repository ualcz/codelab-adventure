
import { Command, CommandHandler, IGameEngine, ExecutionState } from '../types';

export class WhileHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    let { children, params } = command;
    
    if (!children?.length) {
      engine.state.executionPointer++;
      return;
    }
    
    if (!params) {
      params = command.params = {};
    }
    
    this.initializeCondition(command);
    
    this.initializeExecutionState(engine, command);
    
    const state = params.executionState;
    
    const conditionMet = this.evaluateCondition(engine, params);
    
    if (!conditionMet) {
      this.endLoop(engine, state);
      return;
    }
    
    if (conditionMet && state.counter < state.maxIterations && !state.completed) {
      this.executeLoopIteration(engine, command, children, state);
    } else {
      this.endLoop(engine, state);
    }
  }
  
  private initializeCondition(command: Command): void {
    if (!command.params.condition) {
      if (command.condition) {
        command.params.condition = command.condition;
      } else if (command.name) {
        if (command.name.toLowerCase().includes("moeda")) {
          command.params.condition = "untilCollectible";
        } else if (command.name.toLowerCase().includes("barreira")) {
          command.params.condition = "untilBarrier";
        } else if (command.name.toLowerCase().includes("borda")) {
          command.params.condition = "untilBorder";
        } else {
          command.params.condition = "untilBarrier";
        }
      } else {
        command.params.condition = "untilBarrier";
      }
    }
  }
  
  private initializeExecutionState(engine: IGameEngine, command: Command): void {
    if (!command.params.executionState) {
      command.params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        counter: 0,
        maxIterations: command.params.maxIterations || 100,
        nestedCommandsState: {},
        collectibleCollected: false,
        prevCollectibleCount: engine.state.collectiblesGathered
      };
    }
  }
  
  private evaluateCondition(engine: IGameEngine, params: any): boolean {
    const state = params.executionState;
    
    if (params.condition === 'untilBarrier') {
      return !engine.isBarrierInFrontOfRobot();
    } else if (params.condition === 'untilBorder') {
      return !engine.isBorderInFrontOfRobot();
    } else if (params.condition === 'untilCollectible') {
      if (state.collectibleCollected) {
        console.log("Moeda coletada, encerrando loop");
        return false;
      } else {
        const collectibleCount = engine.state.collectiblesGathered;
        if (state.prevCollectibleCount !== undefined && 
            collectibleCount > state.prevCollectibleCount) {
          state.collectibleCollected = true;
          console.log("Moeda coletada durante a execução, encerrando loop");
          return false;
        } else {
          state.prevCollectibleCount = collectibleCount;
          return true;
        }
      }
    }
    
    return true;
  }
  
  private executeLoopIteration(engine: IGameEngine, command: Command, children: Command[], state: ExecutionState): void {
    if (state.childIndex < children.length) {
      const currentChild = children[state.childIndex];
      
      if (currentChild && currentChild.id) {

        this.preserveNestedCommandStates(currentChild, state);
        
        this.setupNestedWhileCondition(currentChild);
        
        engine.executeCommand(currentChild);
        
        this.saveNestedCommandStates(currentChild, state);
        
        if (this.isNestedCommandIncomplete(currentChild)) {
          engine.state.executionPointer = state.parentPointer;
          return;
        }
        
        if (this.checkCollectibleCondition(engine, command, state)) {
          return;
        }
        
        if (!this.reevaluateCondition(engine, command.params)) {
          this.endLoop(engine, state);
          return;
        }
        
        state.childIndex++;
        
        if (state.childIndex < children.length) {
          engine.state.executionPointer = state.parentPointer;
          return;
        } else {
          this.startNextIteration(engine, children, state);
          return;
        }
      }
    }
  }
  
  private preserveNestedCommandStates(currentChild: Command, state: ExecutionState): void {
    if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
        !currentChild.params?.executionState && 
        state.nestedCommandsState[state.childIndex]) {
      if (!currentChild.params) currentChild.params = {};
      currentChild.params.executionState = JSON.parse(JSON.stringify(state.nestedCommandsState[state.childIndex]));
    }
  }
  
  private setupNestedWhileCondition(currentChild: Command): void {
    if (currentChild.id === 'while' && !currentChild.params?.condition) {
      if (!currentChild.params) currentChild.params = {};
      
      if (currentChild.condition) {
        currentChild.params.condition = currentChild.condition;
      } else if (currentChild.name) {
        if (currentChild.name.toLowerCase().includes("moeda")) {
          currentChild.params.condition = "untilCollectible";
        } else if (currentChild.name.toLowerCase().includes("barreira")) {
          currentChild.params.condition = "untilBarrier";
        } else if (currentChild.name.toLowerCase().includes("borda")) {
          currentChild.params.condition = "untilBorder";
        } else {
          currentChild.params.condition = "untilBarrier";
        }
      } else {
        currentChild.params.condition = "untilBarrier";
      }
    }
  }
  
  private saveNestedCommandStates(currentChild: Command, state: ExecutionState): void {
    if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
        currentChild.params?.executionState) {
      if (currentChild.params.executionState.completed) {
        delete state.nestedCommandsState[state.childIndex];
      } else {
        state.nestedCommandsState[state.childIndex] = JSON.parse(JSON.stringify(currentChild.params.executionState));
      }
    }
  }
  
  private isNestedCommandIncomplete(currentChild: Command): boolean {
    return (currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while') && 
           currentChild.params?.executionState?.completed !== true;
  }
  
  private checkCollectibleCondition(engine: IGameEngine, command: Command, state: ExecutionState): boolean {
    if (command.params.condition === 'untilCollectible') {
      const collectibleCount = engine.state.collectiblesGathered;
      if (state.prevCollectibleCount !== undefined && 
          collectibleCount > state.prevCollectibleCount) {
        state.collectibleCollected = true;
        state.completed = true;
        
        this.clearNestedCommandStates(state);
        
        engine.state.executionPointer++;
        return true;
      }
      state.prevCollectibleCount = collectibleCount;
    }
    return false;
  }
  
  private reevaluateCondition(engine: IGameEngine, params: any): boolean {
    const state = params.executionState;
    
    if (params.condition === 'untilBarrier') {
      return !engine.isBarrierInFrontOfRobot();
    } else if (params.condition === 'untilBorder') {
      return !engine.isBorderInFrontOfRobot();
    } else if (params.condition === 'untilCollectible') {
      return !state.collectibleCollected;
    }
    
    return true;
  }
  
  private startNextIteration(engine: IGameEngine, children: Command[], state: ExecutionState): void {
    state.childIndex = 0;
    
    state.counter++;
    
    state.nestedCommandsState = {};
    
    children.forEach(child => {
      if (child.params?.executionState) {
        delete child.params.executionState;
      }
    });
    
    engine.state.executionPointer = state.parentPointer;
  }
  
  private endLoop(engine: IGameEngine, state: ExecutionState): void {
    state.completed = true;
    
    this.clearNestedCommandStates(state);
    
    engine.state.executionPointer++;
  }
  
  private clearNestedCommandStates(state: ExecutionState): void {
    if (state.nestedCommandsState) {
      Object.keys(state.nestedCommandsState).forEach(key => {
        delete state.nestedCommandsState[key];
      });
    }
  }
}
