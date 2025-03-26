
import { Command, CommandHandler, IGameEngine } from '@/types/GameTypes';
import { ConditionEvaluator } from './helpers/conditionEvaluator';
import { WhileStateManager } from './helpers/whileStateManager';
import { SpecialConditionHandler } from './helpers/specialConditionHandler';

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
    
    WhileStateManager.initializeExecutionState(engine, command);
    
    const state = params.executionState;
    
    const conditionMet = ConditionEvaluator.evaluateCondition(engine, params);
    
    if (!conditionMet) {
      WhileStateManager.endLoop(engine, state);
      return;
    }
    
    if (conditionMet && state.counter < state.maxIterations && !state.completed) {
      this.executeLoopIteration(engine, command, children, state);
    } else {
      WhileStateManager.endLoop(engine, state);
    }
  }
  
  private initializeCondition(command: Command): void {
    if (!command.params.condition) {
      command.params.condition = ConditionEvaluator.determineConditionType(command);
    }
  }
  
  private executeLoopIteration(engine: IGameEngine, command: Command, children: Command[], state: any): void {
    if (state.childIndex < children.length) {
      const currentChild = children[state.childIndex];
      
      if (currentChild && currentChild.id) {
        WhileStateManager.preserveNestedCommandStates(currentChild, state);
        
        this.setupNestedWhileCondition(currentChild);
        
        engine.executeCommand(currentChild);
        
        WhileStateManager.saveNestedCommandStates(currentChild, state);
        
        if (WhileStateManager.isNestedCommandIncomplete(currentChild)) {
          engine.state.executionPointer = state.parentPointer;
          return;
        }
        
        if (SpecialConditionHandler.checkCollectibleCondition(engine, command, state)) {
          return;
        }
        
        if (SpecialConditionHandler.checkTargetCondition(engine, command, state)) {
          return;
        }
        
        if (!ConditionEvaluator.evaluateCondition(engine, command.params)) {
          WhileStateManager.endLoop(engine, state);
          return;
        }
        
        state.childIndex++;
        
        if (state.childIndex < children.length) {
          engine.state.executionPointer = state.parentPointer;
          return;
        } else {
          WhileStateManager.startNextIteration(engine, children, state);
          return;
        }
      }
    }
  }
  
  private setupNestedWhileCondition(currentChild: Command): void {
    if (currentChild.id === 'while' && !currentChild.params?.condition) {
      if (!currentChild.params) currentChild.params = {};
      currentChild.params.condition = ConditionEvaluator.determineConditionType(currentChild);
    }
  }
}
