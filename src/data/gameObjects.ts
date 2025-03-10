
import { GameObject } from '@/engine/types';

// Use export type for types when isolatedModules is enabled
export type { GameObject };

export const defaultRobot: GameObject = {
  id: 'robot',
  type: 'robot',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 90 // Default: robot points to the right (90 degrees)
};
