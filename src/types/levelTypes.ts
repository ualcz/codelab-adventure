
import { GameObject } from '@/types/GameTypes';

export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced'|'expert'|'master';
  gridSize: { width: number; height: number };
  objects: GameObject[];
  availableCommands: string[];
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
}
