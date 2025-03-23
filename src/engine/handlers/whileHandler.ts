import { Command, CommandHandler, IGameEngine, ExecutionState } from '../types';

export class WhileHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    let { children, params } = command;
    
    if (!children?.length) {
      console.warn("Invalid while command - no children:", command);
      engine.state.executionPointer++;
      return;
    }
    
    if (!params) {
      params = command.params = {};
    }
    
    // Inicializa a condição do while, sempre usando 'untilBarrier'
    if (!params.condition) {
      if (command.condition) {
        params.condition = command.condition;
      } else {
        if (command.name) {
          if (command.name.includes("Barreira")) {
            params.condition = "untilBarrier";
          } else if (command.name.includes("Borda")) {
            params.condition = "untilBorder";
          } else {
            params.condition = "untilBarrier";
            console.log("Using default 'untilBarrier' condition for while command without defined condition");
          }
        } else {
          params.condition = "untilBarrier";
          console.log("Using default 'untilBarrier' condition for while command without defined condition");
        }
      }
    }
    
    // Inicialização do estado, verificado apenas na primeira execução do comando
    if (!params.executionState) {
      params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        counter: 0,
        maxIterations: params.maxIterations || 100 // Limite de segurança para evitar loops infinitos
      };
      console.log(`Initializing while loop at position ${engine.state.executionPointer}`);
    }
    
    const state = params.executionState;
    
    // Avalia a condição antes de cada iteração
    let conditionMet = true; // Por padrão, continua executando
    
    console.log(`DEBUG WHILE: Evaluating condition '${params.condition}'`);
    
    // Novas condições: continua executando até encontrar verde/vermelho/borda
    if (params.condition === 'untilBarrier') {
      conditionMet = !engine.isBarrierInFrontOfRobot();
      console.log(`DEBUG WHILE: Checking if barrier is NOT in front: ${conditionMet}`);
    }else if (params.condition === 'untilBorder') {
      // Continua executando até encontrar a borda do mapa
      conditionMet = !engine.isBorderInFrontOfRobot();
      console.log(`DEBUG WHILE: Checking if border is NOT in front: ${conditionMet}`);
    }
    
    console.log(`DEBUG WHILE: Condition '${params.condition}' evaluated to: ${conditionMet}`);
    
    // Verifica se a condição é verdadeira e se não excedeu o limite de iterações
    if (conditionMet && state.counter < state.maxIterations && !state.completed) {
      console.log(`DEBUG WHILE: Condition is true, executing while block (iteration ${state.counter})`);
      
      if (state.childIndex < children.length) {
        const currentChild = children[state.childIndex];
        
        if (currentChild && currentChild.id) {
          console.log(`DEBUG WHILE: Executing child command ${state.childIndex}:`, currentChild.id);
          
          engine.executeCommand(currentChild);
          
          // Se o comando filho é um repeat, if ou while que ainda não foi concluído, mantém o ponteiro
          if ((currentChild.id === 'repeat' || currentChild.id === 'if' || currentChild.id === 'while') && 
              currentChild.params?.executionState?.completed !== true) {
            engine.state.executionPointer = state.parentPointer;
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
            
            // Limpa o estado de execução dos filhos para a próxima iteração
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
      if (state.counter >= state.maxIterations) {
        console.warn(`DEBUG WHILE: Max iterations (${state.maxIterations}) reached. Exiting while loop.`);
      } else {
        console.log(`DEBUG WHILE: Condition '${params.condition}' is false, exiting while loop`);
      }
      
      state.completed = true;
      engine.state.executionPointer++;
    }
  }
}