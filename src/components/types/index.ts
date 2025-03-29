
import { Command } from '@/types/GameTypes';

export interface CodeBlocksProps {
  availableCommands: string[];
  onRun: (commands: Command[]) => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export interface DraggableBlockProps {
  block: {
    id: string;
    name: string;
    icon: string;
    type: string;
    description: string;
  };
  onDragStart: (e: React.DragEvent, block: any) => void;
  className?: string;
}

export interface CommandBlockProps {
  command: Command;
  path: (number | string)[];
  onRemove: (path: (number | string)[]) => void;
  onUpdate: (path: (number | string)[], command: Command) => void;
  onMoveCommand: (dragPath: (number | string)[], dropPath: (number | string)[], position: 'before' | 'after' | 'inside', newCommand?: Command) => void;
  isRunning: boolean;
}

export interface CommandControlsProps {
  command: Command;
  isRunning: boolean;
  onUpdate: (command: Command) => void;
}
