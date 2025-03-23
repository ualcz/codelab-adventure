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
    
    // Inicializa a condição do while
    if (!params.condition) {
      if (command.condition) {
        params.condition = command.condition;
      } else if (command.name) {
        if (command.name.toLowerCase().includes("barreira")) {
          params.condition = "untilBarrier";
        } else if (command.name.toLowerCase().includes("borda")) {
          params.condition = "untilBorder";
        } else {
          params.condition = "untilBarrier";
        }
      } else {
        params.condition = "untilBarrier";
      }
    }
    
    // Inicialização do estado, verificado apenas na primeira execução do comando
    if (!params.executionState) {
      params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        counter: 0,
        maxIterations: params.maxIterations || 100,
        nestedCommandsState: {}
      };
    }
    
    const state = params.executionState;
    
    // Avalia a condição antes de cada iteração
    let conditionMet = true;
    
    // Avalia as diferentes condições
    if (params.condition === 'untilBarrier') {
      conditionMet = !engine.isBarrierInFrontOfRobot();
    } else if (params.condition === 'untilBorder') {
      conditionMet = !engine.isBorderInFrontOfRobot();
    }
    
    // Se a condição já for falsa, encerra o loop
    if (!conditionMet) {
      state.completed = true;
      
      // Limpa o estado de todos os comandos aninhados
      if (state.nestedCommandsState) {
        Object.keys(state.nestedCommandsState).forEach(key => {
          delete state.nestedCommandsState[key];
        });
      }
      
      engine.state.executionPointer++;
      return;
    }
    
    // Executa o loop enquanto a condição for verdadeira e não exceder o limite de iterações
    if (conditionMet && state.counter < state.maxIterations && !state.completed) {
      if (state.childIndex < children.length) {
        const currentChild = children[state.childIndex];
        
        if (currentChild && currentChild.id) {
          // Preserva o estado dos comandos aninhados entre iterações
          if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
              !currentChild.params?.executionState && 
              state.nestedCommandsState[state.childIndex]) {
            if (!currentChild.params) currentChild.params = {};
            currentChild.params.executionState = JSON.parse(JSON.stringify(state.nestedCommandsState[state.childIndex]));
          }
          
          // Configura a condição para comandos while aninhados
          if (currentChild.id === 'while' && !currentChild.params?.condition) {
            if (!currentChild.params) currentChild.params = {};
            
            if (currentChild.condition) {
              currentChild.params.condition = currentChild.condition;
            } else if (currentChild.name) {
              if (currentChild.name.toLowerCase().includes("barreira")) {
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
          
          // Garante que o nome do comando reflita a condição
          if (currentChild.id === 'while' && currentChild.params?.condition) {
            if (currentChild.params.condition === "untilBarrier" && !currentChild.name?.toLowerCase().includes("barreira")) {
            } else if (currentChild.params.condition === "untilBorder" && !currentChild.name?.toLowerCase().includes("borda")) {
            }
          }
          
          // Verifica a condição para comandos while aninhados antes de executá-los
          if (currentChild.id === 'while') {
            const childCondition = currentChild.params?.condition || "untilBarrier";
            let childConditionMet = true;
            
            if (childCondition === 'untilBarrier') {
              childConditionMet = !engine.isBarrierInFrontOfRobot();
            } else if (childCondition === 'untilBorder') {
              childConditionMet = !engine.isBorderInFrontOfRobot();
            }
            
            // Se a condição do comando filho já for falsa, marca-o como completado e pula para o próximo
            if (!childConditionMet) {
              if (!currentChild.params) currentChild.params = {};
              if (!currentChild.params.executionState) {
                currentChild.params.executionState = {
                  completed: true,
                  counter: 0,
                  childIndex: 0
                };
              } else {
                currentChild.params.executionState.completed = true;
              }
              state.childIndex++;
              engine.state.executionPointer = state.parentPointer;
              return;
            }
          }
          
          // Executa o comando filho
          engine.executeCommand(currentChild);
          
          // Salva o estado dos comandos aninhados para a próxima iteração
          if ((currentChild.id === 'while' || currentChild.id === 'repeat' || currentChild.id === 'if') && 
              currentChild.params?.executionState) {
            if (currentChild.params.executionState.completed) {
              delete state.nestedCommandsState[state.childIndex];
            } else {
              state.nestedCommandsState[state.childIndex] = JSON.parse(JSON.stringify(currentChild.params.executionState));
            }
          }
          
          // Se o comando filho não foi concluído, mantém o ponteiro
          if ((currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while') && 
              currentChild.params?.executionState?.completed !== true) {
            engine.state.executionPointer = state.parentPointer;
            return;
          }
          
          // Verifica novamente a condição após a execução do comando
          let conditionStillMet = true;
          if (params.condition === 'untilBarrier') {
            conditionStillMet = !engine.isBarrierInFrontOfRobot();
          } else if (params.condition === 'untilBorder') {
            conditionStillMet = !engine.isBorderInFrontOfRobot();
          }
          
          // Se a condição não é mais verdadeira, encerra o loop
          if (!conditionStillMet) {
            state.completed = true;
            
            // Limpa o estado de todos os comandos aninhados
            if (state.nestedCommandsState) {
              Object.keys(state.nestedCommandsState).forEach(key => {
                delete state.nestedCommandsState[key];
              });
            }
            
            engine.state.executionPointer++;
            return;
          }
          
          state.childIndex++;
          
          // Se existem mais comandos filhos, mantém o ponteiro
          if (state.childIndex < children.length) {
            engine.state.executionPointer = state.parentPointer;
            return;
          } else {
            // Reset do índice de filho para reiniciar a próxima iteração
            state.childIndex = 0;
            
            // Incrementa o contador de segurança após completar uma iteração
            state.counter++;
            
            // Reinicializa o estado dos comandos aninhados quando uma iteração completa é finalizada
            state.nestedCommandsState = {};
            
            // Limpa o estado de execução de todos os comandos filhos
            children.forEach(child => {
              if (child.params?.executionState) {
                delete child.params.executionState;
              }
            });
            
            // Volta ao início do while para reavaliar a condição
            engine.state.executionPointer = state.parentPointer;
            return;
          }
        }
      }
    } else {
      // Condição é falsa ou atingiu o limite de iterações
      state.completed = true;
      
      // Limpa o estado de todos os comandos aninhados
      if (state.nestedCommandsState) {
        Object.keys(state.nestedCommandsState).forEach(key => {
          delete state.nestedCommandsState[key];
        });
      }
      
      engine.state.executionPointer++;
    }
  }
}