import { GameObject } from '@/engine/types';
export type { GameObject };

export const defaultRobot: GameObject = {
  id: 'robot',
  type: 'robot',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 90 
};
