
import { ExecutionState, IGameEngine, Command } from '@/types/GameTypes';

export class WhileStateManager {
  static initializeExecutionState(engine: IGameEngine, command: Command): void {
    if (!command.params.executionState) {
      command.params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        counter: 0,
        maxIterations: command.params.maxIterations || 100,
        nestedCommandsState: {},
        collectibleCollected: false,
        prevCollectibleCount: engine.state.collectiblesGathered,
        onTarget: false
      };
    }
  }
  
  static preserveNestedCommandStates(currentChild: Command, state: ExecutionState): void {
    if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
        !currentChild.params?.executionState && 
        state.nestedCommandsState[state.childIndex]) {
      if (!currentChild.params) currentChild.params = {};
      currentChild.params.executionState = JSON.parse(JSON.stringify(state.nestedCommandsState[state.childIndex]));
    }
  }
  
  static saveNestedCommandStates(currentChild: Command, state: ExecutionState): void {
    if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
        currentChild.params?.executionState) {
      if (currentChild.params.executionState.completed) {
        delete state.nestedCommandsState[state.childIndex];
      } else {
        state.nestedCommandsState[state.childIndex] = JSON.parse(JSON.stringify(currentChild.params.executionState));
      }
    }
  }
  
  static isNestedCommandIncomplete(currentChild: Command): boolean {
    return (currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while') && 
           currentChild.params?.executionState?.completed !== true;
  }
  
  static startNextIteration(engine: IGameEngine, children: Command[], state: ExecutionState): void {
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
  
  static endLoop(engine: IGameEngine, state: ExecutionState): void {
    state.completed = true;
    WhileStateManager.clearNestedCommandStates(state);
    engine.state.executionPointer++;
  }
  
  static clearNestedCommandStates(state: ExecutionState): void {
    if (state.nestedCommandsState) {
      Object.keys(state.nestedCommandsState).forEach(key => {
        delete state.nestedCommandsState[key];
      });
    }
  }
}
