
import { Command } from '@/types/GameTypes';

export const cloneCommands = (commands: Command[]): Command[] => {
  return JSON.parse(JSON.stringify(commands));
};

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

export const removeCommand = (commands: Command[], path: (number | string)[]): Command[] => {
  if (path.length === 0) return commands;
  
  const result = cloneCommands(commands);
  
  if (path.length === 1) {
    result.splice(path[0] as number, 1);
    return result;
  }
  
  let current = result;
  for (let i = 0; i < path.length - 2; i++) {
    const index = path[i] as number;
    if (!current[index] || !current[index].children) return commands;
    current = current[index].children;
  }
  
  const parentIndex = path[path.length - 2] as number;
  if (current[parentIndex] && current[parentIndex].children) {
    current[parentIndex].children.splice(path[path.length - 1] as number, 1);
  }
  
  return result;
};

export const updateCommand = (commands: Command[], path: (number | string)[], command: Command): Command[] => {
  if (path.length === 0) return commands;
  
  const result = cloneCommands(commands);
  
  if (path.length === 1) {
    result[path[0] as number] = command;
    return result;
  }
  
  let current = result;
  for (let i = 0; i < path.length - 2; i++) {
    const index = path[i] as number;
    if (!current[index] || !current[index].children) return commands;
    current = current[index].children;
  }
  
  const parentIndex = path[path.length - 2] as number;
  if (current[parentIndex] && current[parentIndex].children) {
    current[parentIndex].children[path[path.length - 1] as number] = command;
  }
  
  return result;
};

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

export const addDummyCommand = (commands: Command[]): Command[] => {
  const result = cloneCommands(commands);
  
  const hasDummy = result.some(cmd => cmd.params?.isDummy);
  
  if (!hasDummy) {
    result.push({
      id: 'dummy',
      name: 'dummy',
      params: { isDummy: true }
    });
  }
  
  return result;
};
