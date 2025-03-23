import { Command } from '@/engine/types';
import { cloneCommands, getCommandByPath } from './commandUtils';

// Move a command from one location to another
export const moveCommand = (
  commands: Command[],
  dragPath: (number | string)[], 
  dropPath: (number | string)[], 
  position: 'before' | 'after' | 'inside',
  newCommand?: Command  // Optional new command for palette drops
) => {
  // If we're dropping a new command from the palette
  if (dragPath.length === 0 && newCommand) {
    const newCommands = cloneCommands(commands);
    
    if (position === 'inside' && dropPath.length > 0) {
      // Add as a child of the drop target
      const parent = getCommandByPath(commands, dropPath);
      if (parent && (parent.id === 'repeat' || parent.id === 'if' || parent.id === 'while')) {
        // Find the parent in the clone
        let current = newCommands;
        for (let i = 0; i < dropPath.length - 1; i++) {
          const index = dropPath[i] as number;
          if (current[index].children) {
            current = current[index].children;
          }
        }
        const parentIndex = dropPath[dropPath.length - 1] as number;
        if (!current[parentIndex].children) current[parentIndex].children = [];
        current[parentIndex].children.push(newCommand);
      }
    } else {
      // Add before/after the drop target
      if (dropPath.length === 0) {
        // Add to the root level
        if (position === 'before') {
          newCommands.unshift(newCommand);
        } else {
          newCommands.push(newCommand);
        }
      } else if (dropPath.length === 1) {
        // Add at the root level before/after a specific command
        const index = dropPath[0] as number;
        const insertAt = position === 'before' ? index : index + 1;
        newCommands.splice(insertAt, 0, newCommand);
      } else {
        // Add inside a parent before/after a specific child
        const parentPath = dropPath.slice(0, -1);
        const childIndex = dropPath[dropPath.length - 1] as number;
        
        // Find the parent in the clone
        let parent = getCommandByPath(commands, parentPath);
        let current = newCommands;
        for (let i = 0; i < parentPath.length - 1; i++) {
          const index = parentPath[i] as number;
          if (current[index].children) {
            current = current[index].children;
          }
        }
        const parentIndex = parentPath[parentPath.length - 1] as number;
        
        // Insert the new command
        if (parent && parent.children) {
          const insertAt = position === 'before' ? childIndex : childIndex + 1;
          if (!current[parentIndex].children) current[parentIndex].children = [];
          current[parentIndex].children.splice(insertAt, 0, newCommand);
        }
      }
    }
    
    return newCommands;
  }
  
  // Get the command that's being dragged
  const draggedCommand = getCommandByPath(commands, dragPath);
  if (!draggedCommand) return commands;
  
  // Create a new command array
  const newCommands = cloneCommands(commands);
  
  // First, remove the dragged command
  if (dragPath.length === 1) {
    // Top-level command
    newCommands.splice(dragPath[0] as number, 1);
  } else {
    // Nested command
    let current = newCommands;
    let parent = null;
    
    for (let i = 0; i < dragPath.length - 1; i++) {
      const index = dragPath[i] as number;
      if (i === dragPath.length - 2) {
        parent = current[index];
      } else if (current[index].children) {
        current = current[index].children;
      }
    }
    
    if (parent && parent.children) {
      parent.children.splice(dragPath[dragPath.length - 1] as number, 1);
    }
  }
  
  // Calculate the drop path offset after removal
  let offsetDropPath = [...dropPath];
  
  // Adjust indices if the drop path is after the drag path at the same level
  if (dragPath.length === dropPath.length) {
    let sameBranch = true;
    for (let i = 0; i < dragPath.length - 1; i++) {
      if (dragPath[i] !== dropPath[i]) {
        sameBranch = false;
        break;
      }
    }
    
    if (sameBranch && dragPath[dragPath.length - 1] < dropPath[dropPath.length - 1]) {
      offsetDropPath[offsetDropPath.length - 1] = (offsetDropPath[offsetDropPath.length - 1] as number) - 1;
    }
  }
  
  // Now, insert the command at the drop location
  if (position === 'inside') {
    // Add as a child of the drop target
    const parent = getCommandByPath(commands, offsetDropPath);
    if (parent && (parent.id === 'repeat' || parent.id === 'if' || parent.id === 'while')) {
      // Find the parent in the clone
      let current = newCommands;
      for (let i = 0; i < offsetDropPath.length - 1; i++) {
        const index = offsetDropPath[i] as number;
        if (current[index].children) {
          current = current[index].children;
        }
      }
      const parentIndex = offsetDropPath[offsetDropPath.length - 1] as number;
      if (!current[parentIndex].children) current[parentIndex].children = [];
      current[parentIndex].children.push(JSON.parse(JSON.stringify(draggedCommand)));
    }
  } else {
    // Add before/after the drop target
    if (offsetDropPath.length === 0) {
      // Add to the root level (empty program)
      newCommands.push(JSON.parse(JSON.stringify(draggedCommand)));
    } else if (offsetDropPath.length === 1) {
      // Add at the root level before/after a specific command
      const index = offsetDropPath[0] as number;
      const insertAt = position === 'before' ? index : index + 1;
      newCommands.splice(insertAt, 0, JSON.parse(JSON.stringify(draggedCommand)));
    } else {
      // Add inside a parent before/after a specific child
      const parentPath = offsetDropPath.slice(0, -1);
      const childIndex = offsetDropPath[offsetDropPath.length - 1] as number;
      
      // Find the parent in the clone
      let parent = getCommandByPath(commands, parentPath);
      let current = newCommands;
      for (let i = 0; i < parentPath.length - 1; i++) {
        const index = parentPath[i] as number;
        if (current[index].children) {
          current = current[index].children;
        }
      }
      const parentIndex = parentPath[parentPath.length - 1] as number;
      
      // Insert the command
      if (parent && parent.children) {
        const insertAt = position === 'before' ? childIndex : childIndex + 1;
        if (!current[parentIndex].children) current[parentIndex].children = [];
        current[parentIndex].children.splice(insertAt, 0, JSON.parse(JSON.stringify(draggedCommand)));
      }
    }
  }
  
  return newCommands;
};
