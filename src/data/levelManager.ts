
import { Level } from './levelTypes';
import LEVELS from './levelsData';
import { getCompletedLevels, saveCompletedLevels, loadProgress } from './progressManager';
export { clearProgress } from './progressManager';

export type { GameObject } from '@/engine/types';
export type { Level } from './levelTypes';
export { getCompletedLevels };

loadProgress();

export const getLevels = (): Level[] => {
  return LEVELS;
};

export const getLevel = (id: number): Level | undefined => {
  return LEVELS.find(level => level.id === id);
};

export const getUnlockedLevels = (): Level[] => {
  return LEVELS.filter(level => level.unlocked);
};

export const unlockLevel = (id: number): void => {
  const level = LEVELS.find(level => level.id === id);
  if (level) {
    level.unlocked = true;
  }
};

export const completeLevel = (id: number): void => {
  const level = LEVELS.find(level => level.id === id);
  if (level) {
    level.completed = true;
    const nextLevel = LEVELS.find(level => level.id === id + 1);
    if (nextLevel) {
      nextLevel.unlocked = true;
    }
    
    saveCompletedLevels();
  }
};

export function getCommandBlocks() {
  return [
    {
      id: 'moveForward',
      name: 'Andar',
      icon: 'arrow-up',
      type: 'control',
      description: 'Move o robô para frente uma casa'
    },
    {
      id: 'moveBackward',
      name: 'Recuar',
      icon: 'arrow-down',
      type: 'control',
      description: 'Move o robô para trás uma casa'
    },
    {
      id: 'turnRight',
      name: 'Girar direita',
      icon: 'rotate-cw',
      type: 'control',
      description: 'Gira o robô para a direita'
    },
    {
      id: 'turnLeft',
      name: 'Girar esquerda',
      icon: 'rotate-ccw',
      type: 'control',
      description: 'Gira o robô para a esquerda'
    },
    {
      id: 'stop',
      name: 'Parar',
      icon: 'pause',
      type: 'control',
      description: 'Faz o robô ficar parado'
    },
    {
      id: 'repeat',
      name: 'Repetir',
      icon: 'repeat',
      type: 'loop',
      description: 'Repete os comandos dentro dele várias vezes'
    },
    {
      id:'while',
      name: 'Enquanto',
      icon: 'GitBranch',
      type: 'loop',
      description: 'Repete os comandos dentro dele enquanto uma condição for verdadeira'
    },
    {
      id: 'if',
      name: 'Se',
      icon: 'GitBranch',
      type: 'condition',
      description: 'Executa comandos se a célula à frente for da cor especificada'
    },
    {
      id: 'paintGreen',
      name: 'Pintar verde',
      icon: 'paint',
      type: 'action',
      description: 'Pinta a célula à frente de verde'
    }
  ];
}
