
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
        // Check if a collectible was collected in the current move
        const currentCount = engine.state.collectiblesGathered;
        conditionMet = currentCount > (params.count ?? currentCount - 1);
        params.count = currentCount;
        console.log(`DEBUG IF: Checking if coin was collected: ${conditionMet}`);
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
      
      // Update the next else block (if it exists) with the condition result
      this.updateNextElseBlock(engine, command, conditionMet);
    }

    const state = params.executionState;

    if (state.shouldExecute && !state.completed) {
      console.log("DEBUG IF: Condition is true, executing if block");

      if (state.childIndex < children.length) {
        const currentChild = children[state.childIndex];

        if (currentChild && currentChild.id) {
          console.log(`DEBUG IF: Executing child command ${state.childIndex}:`, currentChild.id);

          engine.executeCommand(currentChild);

          if ((currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while' || currentChild.id === 'else') && 
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
  
  // Helper method to update the next else block with the condition result
  private updateNextElseBlock(engine: IGameEngine, ifCommand: Command, conditionMet: boolean) {
    const commands = engine.state.commands;
    const currentIndex = engine.state.executionPointer;
    
    // Caso 1: Verificar se o próprio comando if tem um else como filho
    const findDirectElse = (ifCmd: Command) => {
      if (ifCmd.children) {
        const elseIndex = ifCmd.children.findIndex(child => child.id === 'else');
        if (elseIndex >= 0) {
          console.log("Found 'else' block as child, updating condition result:", !conditionMet);
          const elseBlock = ifCmd.children[elseIndex];
          if (!elseBlock.params) elseBlock.params = {};
          elseBlock.params.ifContext = currentIndex; // Referência direta para o if
          
          if (!elseBlock.params.executionState) {
            elseBlock.params.executionState = {
              childIndex: 0,
              parentPointer: currentIndex,
              completed: false,
              counter: 0,
              shouldExecute: !conditionMet
            };
          } else {
            elseBlock.params.executionState.shouldExecute = !conditionMet;
          }
          return true;
        }
      }
      return false;
    };
    
    // Procurar nos filhos diretos
    if (findDirectElse(ifCommand)) {
      return; // Encontrou e atualizou um else nos filhos
    }
    
    // Caso 2: Procurar se estamos em uma estrutura de controle
    // e se há um else irmão do if
    const findParentAndUpdateSiblingElse = () => {
      // Função para encontrar o caminho do comando na árvore
      const findCommandPath = (cmdList: Command[], targetCmd: Command, path: number[] = []): number[] | null => {
        for (let i = 0; i < cmdList.length; i++) {
          const cmd = cmdList[i];
          
          if (cmd === ifCommand) {
            return [...path, i];
          }
          
          if (cmd.children && cmd.children.length > 0) {
            const result = findCommandPath(cmd.children, targetCmd, [...path, i]);
            if (result) return result;
          }
        }
        return null;
      };
      
      const ifPath = findCommandPath(commands, ifCommand);
      if (ifPath && ifPath.length > 1) {
        console.log("Found if command path:", ifPath);
        
        // Navegar até o comando pai
        let parentCommand = commands[ifPath[0]];
        for (let i = 1; i < ifPath.length - 1; i++) {
          parentCommand = parentCommand.children![ifPath[i]];
        }
        
        // Verificar se há um irmão 'else' após este 'if'
        if (parentCommand.children) {
          const ifIndex = ifPath[ifPath.length - 1];
          for (let i = ifIndex + 1; i < parentCommand.children.length; i++) {
            const sibling = parentCommand.children[i];
            if (sibling.id === 'else') {
              console.log("Found sibling else block, updating condition result:", !conditionMet);
              if (!sibling.params) sibling.params = {};
              
              // Link direto para o if atual
              sibling.params.ifContext = currentIndex;
              
              if (!sibling.params.executionState) {
                sibling.params.executionState = {
                  childIndex: 0,
                  parentPointer: i, // Índice relativo ao parent
                  completed: false,
                  counter: 0,
                  shouldExecute: !conditionMet
                };
              } else {
                sibling.params.executionState.shouldExecute = !conditionMet;
              }
              return true;
            }
          }
        }
      }
      return false;
    };
    
    // Tentar encontrar e atualizar um else irmão
    if (findParentAndUpdateSiblingElse()) {
      return;
    }
    
    // Caso 3: Find the next else block at the same level (para comandos em sequência)
    for (let i = currentIndex + 1; i < commands.length; i++) {
      if (commands[i].id === 'else') {
        console.log(`Found 'else' block at index ${i}, updating with condition result: ${!conditionMet}`);
        
        // Update the else block's execution state and link it to this if
        if (!commands[i].params) {
          commands[i].params = {};
        }
        
        // Guardar uma referência direta para o if
        commands[i].params.ifContext = currentIndex;
        
        if (!commands[i].params.executionState) {
          commands[i].params.executionState = {
            childIndex: 0,
            parentPointer: i, // Mantenha o próprio índice como parentPointer
            completed: false,
            counter: 0,
            shouldExecute: !conditionMet
          };
        } else {
          commands[i].params.executionState.shouldExecute = !conditionMet;
        }
        
        // Only update the first else block found
        break;
      }
      
      // Stop searching if we find another if block or control structure
      if (commands[i].id === 'if' || commands[i].id === 'repeat' || commands[i].id === 'while') {
        break;
      }
    }
  }
}
