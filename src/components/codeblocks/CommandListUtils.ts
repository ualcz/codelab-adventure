import { Command } from '@/engine/types';

// Get a command by path
export const getCommandByPath = (commands: Command[], path: (number | string)[]) => {
  let current = [...commands];
  let currentCommand = null;
  
  for (let i = 0; i < path.length; i++) {
    const index = path[i] as number;
    if (i === 0) {
      currentCommand = current[index];
    } else {
      if (!currentCommand.children) return null;
      currentCommand = currentCommand.children[index];
    }
  }
  
  return currentCommand;
};

// Deep clone the commands array
export const cloneCommands = (commands: Command[]) => JSON.parse(JSON.stringify(commands));

// Count blocks in commands
export const countBlocks = (commands: Command[]): number => {
  return commands.reduce((total, cmd) => {
    // Não conta comandos dummy
    if (cmd.params?.isDummy) return total;
    // Adiciona 1 para o comando atual
    let count = 1;
    // Recursivamente conta blocos filhos (para repeat e if)
    if (cmd.children && cmd.children.length > 0) {
      count += countBlocks(cmd.children);
    }
    return total + count;
  }, 0);
};

// Add dummy command after loops (used for nested repeats)
export const addDummyCommand = (commands: Command[]) => {
  const newCommands = [...commands];
  const dummyCommand: Command = {
    id: 'dummy',
    name: 'dummy',
    params: { isDummy: true }
  };
  
  // Procura o último repeat na lista
  let lastRepeatIndex = -1;
  for (let i = newCommands.length - 1; i >= 0; i--) {
    if (newCommands[i].id === 'repeat') {
      lastRepeatIndex = i;
      break;
    }
  }
  
  if (lastRepeatIndex !== -1) {
    // Insere o comando fantasma após o último repeat
    newCommands.splice(lastRepeatIndex + 1, 0, dummyCommand);
  }
  
  return newCommands;
};

// Check for nested repeats
export const hasNestedRepeats = (commands: Command[]): boolean => {
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].id === 'repeat' && commands[i].children?.some(child => child.id === 'repeat')) {
      return true;
    }
  }
  return false;
};

// Create a new command from block data
export const createCommandFromBlock = (block: any): Command => {
  const newCommand: Command = {
    id: block.id,
    name: block.name
  };
  
  if (block.id === 'repeat') {
    newCommand.params = { count: 3 };
    newCommand.children = [];
  } else if (block.id === 'if') {
    newCommand.params = { condition: 'isGreen' };
    newCommand.children = [];
  }
  
  return newCommand;
};
