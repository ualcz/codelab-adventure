
import { IGameEngine } from '@/types/GameTypes';

export class ConditionEvaluator {
  static determineConditionType(command: any): string {
    if (command.params?.condition) {
      return command.params.condition;
    }
    
    if (command.params?.sensorType) {
      switch (command.params.sensorType) {
        case 'barrier': return 'untilBarrier';
        case 'border': return 'untilBorder';
        case 'collectible': return 'untilCollectible';
        case 'target': return 'untilTarget';
        case 'greenCell': return 'isGreen';
        case 'redCell': return 'isRed';
      }
    }
    
    if (command.condition) {
      return command.condition;
    }
    
    if (command.name) {
      if (command.name.toLowerCase().includes("moeda")) {
        return "untilCollectible";
      } else if (command.name.toLowerCase().includes("barreira")) {
        return "untilBarrier";
      } else if (command.name.toLowerCase().includes("borda")) {
        return "untilBorder";
      } else if (command.name.toLowerCase().includes("alvo") || command.name.toLowerCase().includes("target")) {
        return "untilTarget";
      } else if (command.name.toLowerCase().includes("verde")) {
        return "isGreen";
      } else if (command.name.toLowerCase().includes("vermelho")) {
        return "isRed";
      }
    }
    
    return "untilBarrier";
  }
  
  static evaluateCondition(engine: IGameEngine, params: any): boolean {
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
    } else if (params.condition === 'untilTarget') {
      // Verifica se o robô chegou ao alvo
      const { robot, objects } = engine.state;
      const onTarget = objects.some(obj => 
        obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
      );
      
      if (onTarget) {
        console.log("Robô chegou ao alvo, encerrando loop");
        state.onTarget = true;
        return false;
      }
      
      return true;
    } else if (params.condition === 'isGreen') {
      // Verifica se há uma célula verde à frente do robô
      return engine.isCellInFrontOfRobot('green');
    } else if (params.condition === 'isRed') {
      // Verifica se há uma célula vermelha à frente do robô
      return engine.isCellInFrontOfRobot('red');
    }
    
    return true;
  }
}
