
import { Command, CommandHandler, IGameEngine, ExecutionState } from '../types';

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
        if (command.name) {
          if (command.name.includes("Verde")) {
            params.condition = "isGreen";
          } else if (command.name.includes("Vermelho")) {
            params.condition = "isRed";
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

          if ((currentChild.id === 'repeat' || currentChild.id === 'if') && 
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
