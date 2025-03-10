
import React from 'react';
import { getCommandBlocks } from '@/data/levelManager';
import DraggableBlock from './DraggableBlock';

interface CommandPaletteProps {
  availableCommands: string[];
  onDragStart: (e: React.DragEvent, block: any) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ availableCommands, onDragStart }) => {
  const commandBlocks = getCommandBlocks().filter(
    block => availableCommands.includes(block.id)
  );
  
  return (
    <div className="glass-panel border border-white/10 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-4 text-white/90">Blocos Disponíveis</h3>
      <div className="flex flex-wrap gap-2">
        {commandBlocks.map((block) => (
          <DraggableBlock key={block.id} block={block} onDragStart={onDragStart} 
          className="palette-block min-w-[90px] min-h-[20px] flex items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
};

export default CommandPalette;
