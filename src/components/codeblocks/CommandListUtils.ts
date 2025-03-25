
import { Command } from '@/engine/types';

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

export const cloneCommands = (commands: Command[]) => JSON.parse(JSON.stringify(commands));

export const countBlocks = (commands: Command[]): number => {
  return commands.reduce((total, cmd) => {
    if (cmd.params?.isDummy) return total;
    let count = 1;
    if (cmd.children && cmd.children.length > 0) {
      count += countBlocks(cmd.children);
    }
    return total + count;
  }, 0);
};

export const addDummyCommand = (commands: Command[]) => {
  const newCommands = [...commands];
  const dummyCommand: Command = {
    id: 'dummy',
    name: 'dummy',
    params: { isDummy: true }
  };
  
  let lastLoopIndex = -1;
  for (let i = newCommands.length - 1; i >= 0; i--) {
    if (newCommands[i].id === 'repeat' || newCommands[i].id === 'while') {
      lastLoopIndex = i;
      break;
    }
  }
  
  if (lastLoopIndex !== -1) {
    newCommands.splice(lastLoopIndex + 1, 0, dummyCommand);
  }
  
  return newCommands;
};

export const hasNestedRepeats = (commands: Command[]): boolean => {
  for (let i = 0; i < commands.length; i++) {
    if ((commands[i].id === 'repeat' || commands[i].id === 'while') && 
        commands[i].children?.some(child => 
          child.id === 'repeat' || child.id === 'while'
        )) {
      return true;
    }
  }
  return false;
};


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
  } else if (block.id === 'while') {
    newCommand.params = { condition: 'untilBarrier' };
    newCommand.children = [];
  }
  
  return newCommand;
};
