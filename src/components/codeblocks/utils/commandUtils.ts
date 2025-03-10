import { Command } from '@/engine/types';

// Deep clone the commands array
export const cloneCommands = (commands: Command[]) => JSON.parse(JSON.stringify(commands));

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

// Remove a command by path
export const removeCommand = (commands: Command[], path: (number | string)[]) => {
  const newCommands = cloneCommands(commands);
  
  if (path.length === 1) {
    // Top-level command
    newCommands.splice(path[0] as number, 1);
  } else {
    // Nested command
    let current = newCommands;
    let parent = null;
    let parentIndex = null;
    
    for (let i = 0; i < path.length - 1; i++) {
      const index = path[i] as number;
      if (i === path.length - 2) {
        parent = current[index];
        parentIndex = index;
      } else {
        current = current[index].children;
      }
    }
    
    if (parent && parent.children) {
      parent.children.splice(path[path.length - 1] as number, 1);
    }
  }
  
  return newCommands;
};

// Update a command by path
export const updateCommand = (commands: Command[], path: (number | string)[], command: Command) => {
  const newCommands = cloneCommands(commands);
  
  if (path.length === 1) {
    // Top-level command
    newCommands[path[0] as number] = command;
  } else {
    // Nested command
    let current = newCommands;
    
    for (let i = 0; i < path.length - 1; i++) {
      const index = path[i] as number;
      if (i === path.length - 2) {
        if (current[index].children) {
          current[index].children[path[path.length - 1] as number] = command;
        }
      } else if (current[index].children) {
        current = current[index].children;
      }
    }
  }
  
  return newCommands;
};

// Add dummy command for nested repeats
export const addDummyCommand = (commands: Command[]) => {
  const newCommands = [...commands];
  const dummyCommand: Command = {
    id: 'dummy',
    name: 'dummy',
    params: { isDummy: true }
  };
  
  // Find the last repeat in the list
  let lastRepeatIndex = -1;
  for (let i = newCommands.length - 1; i >= 0; i--) {
    if (newCommands[i].id === 'repeat') {
      lastRepeatIndex = i;
      break;
    }
  }
  
  if (lastRepeatIndex !== -1) {
    // Insert the dummy command after the last repeat
    newCommands.splice(lastRepeatIndex + 1, 0, dummyCommand);
  }
  
  return newCommands;
};

// Check if there are nested repeats in the commands
export const hasNestedRepeats = (commands: Command[]) => {
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].id === 'repeat' && commands[i].children?.some(child => child.id === 'repeat')) {
      return true;
    }
  }
  return false;
};
