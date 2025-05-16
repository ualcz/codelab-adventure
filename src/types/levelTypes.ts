
import { GameObject } from '@/types/GameTypes';

export interface Level {
  id?: number; 
  module: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced'|'expert'|'master';
  gridSize: { width: number; height: number };
  objects: GameObject[];
  availableCommands: string[];
  availableSensors?: string[]; 
  objective: string;
  hint?: string;
  maxMoves?: number;
  maxBlocks?: number;
  minBlocks?: number;
  timeLimit?: number;
  unlocked: boolean;
  completed: boolean;
  concepts: string[];
  colorCycleSpeed?: number;
  dynamicEnvironment?: boolean;
  multipleRobots?: boolean;
  resourceManagement?: boolean;
}
