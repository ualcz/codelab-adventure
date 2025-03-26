
import { Command } from '@/types/GameTypes';

// Deep clone the commands array
export const cloneCommands = (commands: Command[]): Command[] => {
  return JSON.parse(JSON.stringify(commands));
};

// Get a command by its path in the commands tree
export const getCommandByPath = (commands: Command[], path: (number | string)[]): Command | null => {
  if (path.length === 0) return null;
  
  let current = commands;
  for (let i = 0; i < path.length - 1; i++) {
    const index = path[i] as number;
    if (!current[index] || !current[index].children) return null;
    current = current[index].children;
  }
  
  const index = path[path.length - 1] as number;
  return current[index] || null;
};

// Remove a command at a given path
export const removeCommand = (commands: Command[], path: (number | string)[]): Command[] => {
  if (path.length === 0) return commands;
  
  const result = cloneCommands(commands);
  
  if (path.length === 1) {
    // Remove from root level
    result.splice(path[0] as number, 1);
    return result;
  }
  
  // Navigate to the parent
  let current = result;
  for (let i = 0; i < path.length - 2; i++) {
    const index = path[i] as number;
    if (!current[index] || !current[index].children) return commands;
    current = current[index].children;
  }
  
  // Get the parent and remove the child
  const parentIndex = path[path.length - 2] as number;
  if (current[parentIndex] && current[parentIndex].children) {
    current[parentIndex].children.splice(path[path.length - 1] as number, 1);
  }
  
  return result;
};

// Update a command at a given path
export const updateCommand = (commands: Command[], path: (number | string)[], command: Command): Command[] => {
  if (path.length === 0) return commands;
  
  const result = cloneCommands(commands);
  
  if (path.length === 1) {
    // Update at root level
    result[path[0] as number] = command;
    return result;
  }
  
  // Navigate to the parent
  let current = result;
  for (let i = 0; i < path.length - 2; i++) {
    const index = path[i] as number;
    if (!current[index] || !current[index].children) return commands;
    current = current[index].children;
  }
  
  // Get the parent and update the child
  const parentIndex = path[path.length - 2] as number;
  if (current[parentIndex] && current[parentIndex].children) {
    current[parentIndex].children[path[path.length - 1] as number] = command;
  }
  
  return result;
};

// Check if there are nested repeats or while loops
export const hasNestedRepeats = (commands: Command[]): boolean => {
  for (const command of commands) {
    if ((command.id === 'repeat' || command.id === 'while') && command.children && command.children.length > 0) {
      for (const child of command.children) {
        if (child.id === 'repeat' || child.id === 'while') {
          return true;
        }
      }
    }
  }
  return false;
};

// Add a dummy command to the commands array if it doesn't already exist
export const addDummyCommand = (commands: Command[]): Command[] => {
  const result = cloneCommands(commands);
  
  // Check if a dummy command already exists
  const hasDummy = result.some(cmd => cmd.params?.isDummy);
  
  if (!hasDummy) {
    // Add a dummy command that will be used for execution but not rendered
    result.push({
      id: 'dummy',
      name: 'dummy',
      params: { isDummy: true }
    });
  }
  
  return result;
};
