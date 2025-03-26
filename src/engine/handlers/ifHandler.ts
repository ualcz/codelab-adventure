
import { Command, CommandHandler, IGameEngine, ExecutionState } from '@/types/GameTypes';

export class IfHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    let { children, params } = command;

    if (!children?.length) {
      console.warn("Invalid if command - no children:", command);
      engine.state.executionPointer++;
      return;
    }

    if (!params) {
      params = command.params = {};
    }

    if (!params.condition) {
      if (command.condition) {
        params.condition = command.condition;
      } else {
        // Use the sensorType to determine the condition
        if (params.sensorType) {
          switch (params.sensorType) {
            case 'greenCell':
              params.condition = 'isGreen';
              break;
            case 'redCell':
              params.condition = 'isRed';
              break;
            case 'collectible':
              params.condition = 'collectibleCollected';
              break;
            case 'target':
              params.condition = 'targetReached';
              break;
            case 'barrier':
              params.condition = 'isBarrierAhead';
              break;
            case 'border':
              params.condition = 'isBorderAhead';
              break;
            default:
              params.condition = 'isGreen';
              break;
          }
        } else if (command.name) {
          if (command.name.includes("Verde")) {
            params.condition = "isGreen";
          } else if (command.name.includes("Vermelho")) {
            params.condition = "isRed";
          } else if (command.name.includes("Moeda") || command.name.includes("moeda")) {
            params.condition = "collectibleCollected";
          } else if (command.name.includes("Alvo") || command.name.includes("alvo")) {
            params.condition = "targetReached";
          } else if (command.name.includes("Barreira") || command.name.includes("barreira")) {
            params.condition = "isBarrierAhead";
          } else if (command.name.includes("Borda") || command.name.includes("borda")) {
            params.condition = "isBorderAhead";
          } else {
            params.condition = "isGreen";
            console.log("Using default 'isGreen' condition for if command without defined condition");
          }
        } else {
          params.condition = "isGreen";
          console.log("Using default 'isGreen' condition for if command without defined condition");
        }
      }
    }

    if (!params.executionState) {
      let conditionMet = false;

      console.log(`DEBUG IF: Evaluating condition '${params.condition}'`);

      if (params.condition === 'isGreen') {
        conditionMet = engine.isCellInFrontOfRobot('green');
      } else if (params.condition === 'isRed') {
        conditionMet = engine.isCellInFrontOfRobot('red');
      } else if (params.condition === 'collectibleCollected') {
        // Verificar se uma moeda foi coletada durante a execução
        conditionMet = engine.state.collectiblesGathered > 0;
        console.log(`DEBUG IF: Verificando se moeda foi coletada: ${conditionMet}`);
      } else if (params.condition === 'targetReached') {
        // Verificar se o robô chegou ao alvo
        const { robot, objects } = engine.state;
        conditionMet = objects.some(obj => 
          obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
        );
        console.log(`DEBUG IF: Verificando se chegou ao alvo: ${conditionMet}`);
      } else if (params.condition === 'isBarrierAhead') {
        conditionMet = engine.isBarrierInFrontOfRobot();
        console.log(`DEBUG IF: Verificando se há barreira à frente: ${conditionMet}`);
      } else if (params.condition === 'isBorderAhead') {
        conditionMet = engine.isBorderInFrontOfRobot();
        console.log(`DEBUG IF: Verificando se há borda à frente: ${conditionMet}`);
      }

      console.log(`DEBUG IF: Condition '${params.condition}' evaluated to: ${conditionMet}`);

      params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        shouldExecute: conditionMet,
        counter: 0
      };
    }

    const state = params.executionState;

    if (state.shouldExecute && !state.completed) {
      console.log("DEBUG IF: Condition is true, executing if block");

      if (state.childIndex < children.length) {
        const currentChild = children[state.childIndex];

        if (currentChild && currentChild.id) {
          console.log(`DEBUG IF: Executing child command ${state.childIndex}:`, currentChild.id);

          engine.executeCommand(currentChild);

          if ((currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while') && 
              currentChild.params?.executionState?.completed !== true) {
            engine.state.executionPointer = state.parentPointer;
            return;
          }

          state.childIndex++;

          if (state.childIndex < children.length) {
            engine.state.executionPointer = state.parentPointer;
            return;
          }
        }
      }

      console.log("DEBUG IF: Completed all commands in the if block");
      state.completed = true;
      engine.state.executionPointer++;
    } else if (!state.completed) {
      console.log(`DEBUG IF: Condition '${params.condition}' is false, skipping if block`);
      state.completed = true;
      engine.state.executionPointer++;
    }
  }
}
