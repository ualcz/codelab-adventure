import { Command } from '@/types/GameTypes';
import { cloneCommands, getCommandByPath } from '@/components/utils/commandUtils';

export const moveCommand = (
  commands: Command[],
  dragPath: (number | string)[], 
  dropPath: (number | string)[], 
  position: 'before' | 'after' | 'inside',
  newCommand?: Command 
) => {
  if (dragPath.length === 0 && newCommand) {
    const newCommands = cloneCommands(commands);
    
    if (newCommand.id === 'else') {

      if (position === 'after' && dropPath.length > 0) {
        const prevCommandPath = [...dropPath];
        const prevCommandIndex = prevCommandPath[prevCommandPath.length - 1] as number;
        
        let current = newCommands;
        for (let i = 0; i < prevCommandPath.length - 1; i++) {
          const index = prevCommandPath[i] as number;
          if (!current[index]) return commands;
          current = current[index].children || [];
        }
        
        const prevCommand = current[prevCommandIndex];
        if (prevCommand && prevCommand.id === 'if') {
  
          if (!newCommand.params) {
            newCommand.params = {};
          }
          if (!newCommand.params.executionState) {
            newCommand.params.executionState = {
              shouldExecute: false,
              counter: 0,
              childIndex: 0,
              completed: false
            };
          }
          if (!newCommand.children) {
            newCommand.children = [];
          }
        }
      }
    }
    
    if (newCommand.id.startsWith('sensor_')) {
      const sensorType = newCommand.id.split('sensor_')[1] as 'barrier' | 'border' | 'collectible' | 'target' | 'redCell' | 'greenCell';
      
      if (position === 'inside' && dropPath.length > 0) {
        const parent = getCommandByPath(commands, dropPath);
        
        if (parent) {
          if (parent.id === 'while') {
 
            let current = newCommands;
            for (let i = 0; i < dropPath.length - 1; i++) {
              const index = dropPath[i] as number;
              if (current[index]) {
                current = current[index].children || [];
              }
            }
            const parentIndex = dropPath[dropPath.length - 1] as number;
            if (current[parentIndex]) {
              current[parentIndex].params = {
                ...current[parentIndex].params,
                sensorType: sensorType,
                sensorBlock: newCommand.id,
                condition: sensorType === 'barrier' ? 'untilBarrier' : 
                           sensorType === 'border' ? 'untilBorder' : 
                           sensorType === 'collectible' ? 'untilCollectible' : 
                           sensorType === 'target' ? 'untilTarget' :
                           sensorType === 'redCell' ? 'untilRed' :
                           'untilGreen'
              };
              current[parentIndex].name = `Enquanto ${getWhileDescription(sensorType)}`;
            }
            return newCommands;
          } else if (parent.id === 'if') {
            let current = newCommands;
            for (let i = 0; i < dropPath.length - 1; i++) {
              const index = dropPath[i] as number;
              if (current[index]) {
                current = current[index].children || [];
              }
            }
            const parentIndex = dropPath[dropPath.length - 1] as number;
            if (current[parentIndex]) {
              current[parentIndex].params = {
                ...current[parentIndex].params,
                sensorType: sensorType,
                sensorBlock: newCommand.id,
                condition: sensorType === 'greenCell' ? 'isGreen' : 
                           sensorType === 'redCell' ? 'isRed' : 
                           sensorType === 'collectible' ? 'collectibleCollected' : 
                           sensorType === 'target' ? 'targetReached' :
                           sensorType === 'barrier' ? 'isBarrierAhead' :
                           'isBorderAhead'
              };
              current[parentIndex].name = `Se ${getIfDescription(sensorType)}`;
            }
            return newCommands;
          }
        }
      }
      
      console.log("Sensores só podem ser usados dentro de blocos 'Se' ou 'Enquanto'");
      return commands;
    }
    
    if (position === 'inside' && dropPath.length > 0) {
      const parent = getCommandByPath(commands, dropPath);
      if (parent && (parent.id === 'repeat' || parent.id === 'if' || parent.id === 'while' || parent.id === 'else')) {
        let current = newCommands;
        for (let i = 0; i < dropPath.length - 1; i++) {
          const index = dropPath[i] as number;
          if (current[index] && current[index].children) {
            current = current[index].children;
          }
        }
        const parentIndex = dropPath[dropPath.length - 1] as number;
        if (!current[parentIndex].children) current[parentIndex].children = [];
        current[parentIndex].children.push(newCommand);
        return newCommands;
      }
    } else {
      if (dropPath.length === 0) {
        if (position === 'before') {
          newCommands.unshift(newCommand);
        } else {
          newCommands.push(newCommand);
        }
      } else if (dropPath.length === 1) {
        const index = dropPath[0] as number;
        const insertAt = position === 'before' ? index : index + 1;
        newCommands.splice(insertAt, 0, newCommand);
      } else {
        const parentPath = dropPath.slice(0, -1);
        const childIndex = dropPath[dropPath.length - 1] as number;
        
        let parent = getCommandByPath(commands, parentPath);
        let current = newCommands;
        for (let i = 0; i < parentPath.length - 1; i++) {
          const index = parentPath[i] as number;
          if (current[index] && current[index].children) {
            current = current[index].children;
          }
        }
        const parentIndex = parentPath[parentPath.length - 1] as number;
        
        if (parent && parent.children) {
          const insertAt = position === 'before' ? childIndex : childIndex + 1;
          if (!current[parentIndex].children) current[parentIndex].children = [];
          current[parentIndex].children.splice(insertAt, 0, newCommand);
        }
      }
    }
    
    return newCommands;
  }
  
  const draggedCommand = getCommandByPath(commands, dragPath);
  if (!draggedCommand) return commands;
  
  if (draggedCommand.id.startsWith('sensor_')) {
    console.log("Sensores não podem ser movidos diretamente");
    return commands;
  }
  
  const newCommands = cloneCommands(commands);
  
  if (dragPath.length === 1) {
    newCommands.splice(dragPath[0] as number, 1);
  } else {
    let current = newCommands;
    let parent = null;
    
    for (let i = 0; i < dragPath.length - 1; i++) {
      const index = dragPath[i] as number;
      if (i === dragPath.length - 2) {
        parent = current[index];
      } else if (current[index] && current[index].children) {
        current = current[index].children;
      }
    }
    
    if (parent && parent.children) {
      parent.children.splice(dragPath[dragPath.length - 1] as number, 1);
    }
  }
  
  let offsetDropPath = [...dropPath];
  
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
  
  if (position === 'inside') {
    const parent = getCommandByPath(newCommands, offsetDropPath);
    if (parent && (parent.id === 'repeat' || parent.id === 'if' || parent.id === 'while' || parent.id === 'else')) {
      let current = newCommands;
      for (let i = 0; i < offsetDropPath.length - 1; i++) {
        const index = offsetDropPath[i] as number;
        if (current[index] && current[index].children) {
          current = current[index].children;
        }
      }
      const parentIndex = offsetDropPath[offsetDropPath.length - 1] as number;
      if (!current[parentIndex].children) current[parentIndex].children = [];
      current[parentIndex].children.push(JSON.parse(JSON.stringify(draggedCommand)));
    }
  } else {
    if (offsetDropPath.length === 0) {
      newCommands.push(JSON.parse(JSON.stringify(draggedCommand)));
    } else if (offsetDropPath.length === 1) {
      const index = offsetDropPath[0] as number;
      const insertAt = position === 'before' ? index : index + 1;
      newCommands.splice(insertAt, 0, JSON.parse(JSON.stringify(draggedCommand)));
    } else {
      const parentPath = offsetDropPath.slice(0, -1);
      const childIndex = offsetDropPath[offsetDropPath.length - 1] as number;
      
      let parent = getCommandByPath(newCommands, parentPath);
      let current = newCommands;
      for (let i = 0; i < parentPath.length - 1; i++) {
        const index = parentPath[i] as number;
        if (current[index] && current[index].children) {
          current = current[index].children;
        }
      }
      const parentIndex = parentPath[parentPath.length - 1] as number;
      
      if (parent && parent.children) {
        const insertAt = position === 'before' ? childIndex : childIndex + 1;
        if (!current[parentIndex].children) current[parentIndex].children = [];
        current[parentIndex].children.splice(insertAt, 0, JSON.parse(JSON.stringify(draggedCommand)));
      }
    }
  }
  
  return newCommands;
};




function getIfDescription(sensorType: 'barrier' | 'border' | 'collectible' | 'target' | 'redCell' | 'greenCell'): string {
  switch (sensorType) {
    case 'barrier': return 'encontrar barreira';
    case 'border': return 'encontrar borda';
    case 'collectible': return 'tiver moeda coletada';
    case 'target': return 'estiver no alvo';
    case 'greenCell': return 'encontrar verde na frente';
    case 'redCell': return 'encontrar vermelho na frente';
    default: return '';
  }
}

function getWhileDescription(sensorType: 'barrier' | 'border' | 'collectible' | 'target' | 'redCell' | 'greenCell'): string {
  switch (sensorType) {
    case 'barrier': return 'não houver barreira';
    case 'border': return 'não houver borda';
    case 'collectible': return 'não tiver moeda coletada';
    case 'target': return 'não chegar no alvo';
    case 'greenCell': return 'encontrar verde na frente';
    case 'redCell': return 'encontrar vermelho na frente';
    default: return '';
  }
}
