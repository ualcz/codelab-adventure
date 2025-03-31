import { Command, CommandHandler, IGameEngine, ExecutionState } from '@/types/GameTypes';

export class MoveForwardHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.moveRobot(true);
  }
}

export class MoveBackwardHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.moveRobot(false);
  }
}

export class TurnRightHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    const count = command.params?.count || 1;
    engine.rotateRobot(90 * count);
  }
}

export class TurnLeftHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    const count = command.params?.count || 1;
    engine.rotateRobot(-90 * count);
  }
}

export class StopHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.state.moves++;
    console.log("Robot stopped in place");
  }
}

export class PaintGreenHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    if (engine.isCellInFrontOfRobot('red')) {
      engine.paintCellInFrontOfRobot('green');
    }
    engine.state.executionPointer++;
  }
}

export class ElseHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    let { children, params } = command;

    if (!children?.length) {
      console.log("Invalid else command - no children:", command);
      engine.state.executionPointer++;
      return;
    }

    if (!params) {
      params = command.params = {};
    }

    // Encontrar o bloco 'if' anterior e seu estado de execução
    const prevIfExecutionState = this.getPreviousIfExecutionState(engine, command);
    
    // Só executar o bloco 'else' se a condição do 'if' anterior for falsa
    // Se não encontrarmos um if anterior válido, não executamos o else
    const shouldExecute = prevIfExecutionState ? !prevIfExecutionState.shouldExecute : false;
    
    console.log("DEBUG ELSE: Previous If execution state:", prevIfExecutionState, 
                "Should execute else:", shouldExecute);

    if (!params.executionState) {
      params.executionState = {
        childIndex: 0,
        parentPointer: engine.state.executionPointer,
        completed: false,
        shouldExecute: shouldExecute,
        counter: 0
      };
    } else {
      // Atualizar shouldExecute com base na condição do if anterior
      params.executionState.shouldExecute = shouldExecute;
    }

    const state = params.executionState;

    if (state.shouldExecute && !state.completed) {
      console.log("DEBUG ELSE: Condition is false, executing else block");

      if (state.childIndex < children.length) {
        const currentChild = children[state.childIndex];

        if (currentChild && currentChild.id) {
          console.log(`DEBUG ELSE: Executing child command ${state.childIndex}:`, currentChild.id);

          engine.executeCommand(currentChild);

          // Check if the child command is a control block that hasn't finished yet
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

      console.log("DEBUG ELSE: Completed all commands in the else block");
      state.completed = true;
      engine.state.executionPointer++;
    } else if (!state.completed) {
      console.log(`DEBUG ELSE: Condition is true, skipping else block`);
      state.completed = true;
      engine.state.executionPointer++;
    }
  }

  // Método melhorado para encontrar o estado de execução do bloco if anterior
  private getPreviousIfExecutionState(engine: IGameEngine, elseCommand: Command) {
    const commands = engine.state.commands;
    const currentIndex = engine.state.executionPointer;
    
    // Caso 1: Verificar se o else está dentro de um bloco de controle
    // e tem um irmão "if" anterior
    if (elseCommand.params?.ifContext) {
      const ifCommand = commands[elseCommand.params.ifContext];
      if (ifCommand && ifCommand.id === 'if' && ifCommand.params?.executionState) {
        console.log("Found direct reference to if block:", ifCommand);
        return ifCommand.params.executionState;
      }
    }

    // Caso 2: Verificar se estamos dentro de um loop ou estrutura de controle
    // Procurar o comando pai atual na árvore de comandos
    const findParentCommand = (cmdList: Command[], targetCmd: Command, path: number[] = []): number[] | null => {
      for (let i = 0; i < cmdList.length; i++) {
        const cmd = cmdList[i];
        
        if (cmd === targetCmd) {
          return [...path, i];
        }
        
        if (cmd.children && cmd.children.length > 0) {
          const result = findParentCommand(cmd.children, targetCmd, [...path, i]);
          if (result) return result;
        }
      }
      return null;
    };
    
    const commandPath = findParentCommand(commands, elseCommand);
    if (commandPath && commandPath.length > 1) {
      console.log("Found command path:", commandPath);
      
      // Navegar até o comando pai
      let parentCommand = commands[commandPath[0]];
      for (let i = 1; i < commandPath.length - 1; i++) {
        parentCommand = parentCommand.children![commandPath[i]];
      }
      
      // Verificar se há um irmão 'if' antes deste 'else'
      if (parentCommand.children) {
        const elseIndex = commandPath[commandPath.length - 1];
        for (let i = 0; i < elseIndex; i++) {
          const sibling = parentCommand.children[i];
          if (sibling.id === 'if' && sibling.params?.executionState) {
            console.log("Found sibling if block:", sibling);
            return sibling.params.executionState;
          }
        }
      }
    }

    // Caso 3: Procurar por um 'if' anterior no mesmo nível dos comandos principais
    for (let i = currentIndex - 1; i >= 0; i--) {
      const cmd = commands[i];
      if (cmd.id === 'if' && cmd.params?.executionState) {
        console.log("Found previous if at index", i);
        return cmd.params.executionState;
      }
      
      // Se encontrarmos outro bloco de controle, paramos
      if (i !== currentIndex - 1 && 
          (cmd.id === 'repeat' || cmd.id === 'while' || cmd.id === 'else')) {
        break;
      }
    }
    
    console.log("No previous if block found");
    return null;
  }
}
