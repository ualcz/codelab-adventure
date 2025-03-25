
import { Position, GameObject } from './types';

export function getDirectionVector(rotation: number): Position {
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  
  let dx = 0;
  let dy = 0;
  
  if (normalizedRotation === 0) dy = -1;
  else if (normalizedRotation === 90) dx = 1;
  else if (normalizedRotation === 180) dy = 1;
  else if (normalizedRotation === 270) dx = -1;
  
  return { x: dx, y: dy };
}

export function createInitialRobot(): GameObject {
  return {
    id: 'robot',
    type: 'robot',
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    rotation: 90 
  };
}

export function resetCommandStates(commands: any[]): void {
  commands.forEach(command => {
    if (command.params) {
      delete command.params.executionState;
    }
    if (command.children) {
      resetCommandStates(command.children);
    }
  });
}
