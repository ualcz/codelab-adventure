
import { IGameEngine, Command, ExecutionState } from '@/types/GameTypes';
import { WhileStateManager } from './whileStateManager';

export class SpecialConditionHandler {
  static checkCollectibleCondition(engine: IGameEngine, command: Command, state: ExecutionState): boolean {
    if (command.params.condition === 'untilCollectible') {
      const collectibleCount = engine.state.collectiblesGathered;
      if (state.prevCollectibleCount !== undefined && 
          collectibleCount > state.prevCollectibleCount) {
        state.collectibleCollected = true;
        state.completed = true;
        
        WhileStateManager.clearNestedCommandStates(state);
        
        engine.state.executionPointer++;
        return true;
      }
      state.prevCollectibleCount = collectibleCount;
    }
    return false;
  }
  
  static checkTargetCondition(engine: IGameEngine, command: Command, state: ExecutionState): boolean {
    if (command.params.condition === 'untilTarget') {
      // Verifica se o robô está no alvo
      const { robot, objects } = engine.state;
      const onTarget = objects.some(obj => 
        obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
      );
      
      if (onTarget) {
        console.log("Robô alcançou o alvo durante a execução, encerrando loop");
        state.onTarget = true;
        state.completed = true;
        
        WhileStateManager.clearNestedCommandStates(state);
        
        engine.state.executionPointer++;
        return true;
      }
    }
    return false;
  }
}
