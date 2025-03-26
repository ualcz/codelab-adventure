
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
      // Use sensorType to determine condition if available
      if (command.params.sensorType) {
        switch (command.params.sensorType) {
          case 'barrier':
            command.params.condition = 'untilBarrier';
            break;
          case 'border':
            command.params.condition = 'untilBorder';
            break;
          case 'collectible':
            command.params.condition = 'untilCollectible';
            break;
          case 'target':
            command.params.condition = 'untilTarget';
            break;
          case 'greenCell':
            command.params.condition = 'isGreen';
            break;
          case 'redCell':
            command.params.condition = 'isRed';
            break;
          default:
            command.params.condition = ConditionEvaluator.determineConditionType(command);
            break;
        }
      } else {
        command.params.condition = ConditionEvaluator.determineConditionType(command);
      }
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
      
      // Use sensorType to determine condition if available
      if (currentChild.params.sensorType) {
        switch (currentChild.params.sensorType) {
          case 'barrier':
            currentChild.params.condition = 'untilBarrier';
            break;
          case 'border':
            currentChild.params.condition = 'untilBorder';
            break;
          case 'collectible':
            currentChild.params.condition = 'untilCollectible';
            break;
          case 'target':
            currentChild.params.condition = 'untilTarget';
            break;
          case 'greenCell':
            currentChild.params.condition = 'isGreen';
            break;
          case 'redCell':
            currentChild.params.condition = 'isRed';
            break;
          default:
            currentChild.params.condition = ConditionEvaluator.determineConditionType(currentChild);
            break;
        }
      } else {
        currentChild.params.condition = ConditionEvaluator.determineConditionType(currentChild);
      }
    }
  }
}
