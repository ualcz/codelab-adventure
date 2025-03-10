
import { Command, CommandHandler, IGameEngine, ExecutionState } from '../types';

export class RepeatHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    let { children, params } = command;
    
    if (!children?.length || typeof params?.count !== 'number') {
      console.warn("Invalid repeat command:", { children, params });
      return;
    }
    
    if (!params.executionState) {
      const isNested = this.isNestedRepeat(engine, command);
      
      params.executionState = {
        currentIteration: 0,
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        childrenCompleted: new Array(children.length).fill(false),
        isMainRepeat: !isNested,
        counter: 0
      };
      
      console.log(`Initializing ${isNested ? 'nested' : 'main'} repeat at position ${engine.state.executionPointer}`);
      
      children.forEach((child, index) => {
        console.log(`Preparing child ${index} of repeat:`, child);
        
        if (child.id === 'if') {
          if (!child.params) {
            child.params = {};
          }
          
          if (!child.params.condition) {
            if (child.condition) {
              child.params.condition = child.condition;
            } else {
              if (child.name && child.name.includes("Verde")) {
                child.params.condition = "isGreen";
              } else if (child.name && child.name.includes("Vermelho")) {
                child.params.condition = "isRed";
              } else if (child.name && child.name.includes("Coletável")) {
                child.params.condition = "hasCollectible";
              } else if (child.name && child.name.includes("Alvo")) {
                child.params.condition = "isTarget";
              } else {
                child.params.condition = "isGreen";
              }
            }
          }
          
          console.log(`If command prepared with condition: ${child.params.condition}`);
        }
      });
    }

    if (!params.executionState.childrenCompleted) {
      params.executionState.childrenCompleted = new Array(children.length).fill(false);
    }

    const state = params.executionState;
    
    if (state.currentIteration < params.count && !state.completed) {
      const currentChild = children[state.childIndex];
      
      if (currentChild && currentChild.id) {
        console.log(`Repeat: iteration ${state.currentIteration}, child ${state.childIndex}, command ${currentChild.id}`);
        
        if (currentChild.id === 'if') {
          console.log("Executing if inside repeat:", currentChild);
        }
        
        if (currentChild.id === 'repeat') {
          if (!currentChild.params) {
            currentChild.params = { count: currentChild.params?.count || 1 };
          }
          
          if (!currentChild.params.executionState) {
            console.log('Starting new cycle of child repeat');
            currentChild.params.executionState = {
              currentIteration: 0,
              childIndex: 0,
              parentPointer: engine.state.executionPointer,
              completed: false,
              childrenCompleted: new Array(currentChild.children?.length || 0).fill(false),
              isMainRepeat: false,
              counter: 0
            };
          }
          
          engine.executeCommand(currentChild);
          
          if (currentChild.params.executionState.completed) {
            state.childrenCompleted[state.childIndex] = true;
            state.childIndex++;
            delete currentChild.params.executionState;
          }
        } else {
          engine.executeCommand(currentChild);
          state.childrenCompleted[state.childIndex] = true;
          state.childIndex++;
        }
        
        if (state.childIndex >= children.length) {
          console.log(`Completed iteration ${state.currentIteration}`);
          state.childIndex = 0;
          state.currentIteration++;
          state.childrenCompleted.fill(false);
          
          children.forEach(child => {
            if (child.params?.executionState) {
              delete child.params.executionState;
            }
          });
          
          if (state.currentIteration >= params.count) {
            console.log('Completed all repeat iterations');
            state.completed = true;
            
            if (!state.isMainRepeat) {
              console.log('It is a nested repeat, not incrementing pointer');
            } else {
              console.log('It is a main repeat, incrementing pointer once');
              engine.state.executionPointer = state.parentPointer + 1;
              if (engine.state._safetyCounter) {
                engine.state._safetyCounter.count = 0;
              }
            }
            return;
          }
        }
        
        if (!state.completed) {
          if (engine.state.executionPointer !== state.parentPointer) {
            console.log('Going back to repeat start:', state.parentPointer);
            engine.state.executionPointer = state.parentPointer;
          }
        }
      } else {
        console.warn("Invalid child command in repeat:", currentChild);
        state.completed = true;
        engine.state.executionPointer++;
      }
    } else if (!state.completed) {
      state.completed = true;
      
      if (state.isMainRepeat) {
        engine.state.executionPointer = state.parentPointer + 1;
      }
    }
  }

  private isNestedRepeat(engine: IGameEngine, currentCommand: Command): boolean {
    const commands = engine.getState().commands;
    let currentIndex = engine.state.executionPointer;
    
    for (let i = 0; i < commands.length; i++) {
      if (i === currentIndex) continue;
      
      const command = commands[i];
      if (command && command.id === 'repeat') {
        const children = command.children || [];
        for (const child of children) {
          if (child === currentCommand) {
            return true;
          }
          
          if (child.id === 'repeat' && child.children) {
            const hasNestedCommand = this.checkNestedCommand(child.children, currentCommand);
            if (hasNestedCommand) return true;
          }
        }
      }
    }
    
    return false;
  }
  
  private checkNestedCommand(children: Command[], targetCommand: Command): boolean {
    for (const child of children) {
      if (child === targetCommand) {
        return true;
      }
      
      if (child.id === 'repeat' && child.children) {
        const hasNestedCommand = this.checkNestedCommand(child.children, targetCommand);
        if (hasNestedCommand) return true;
      }
    }
    
    return false;
  }
}
