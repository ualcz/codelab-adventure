
import React from 'react';
import { getCommandBlocks, sensorObjects  } from '@/data/level/levelManager';
import DraggableBlock from './blocks/DraggableBlock';

interface CommandPaletteProps {
  availableCommands: string[];
  availableSensors?: string[]; // Adicionado novo prop para sensores disponíveis
  onDragStart: (e: React.DragEvent, block: any) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  availableCommands, 
  availableSensors = ['barrier', 'border', 'collectible', 'target', 'redCell', 'greenCell'], // Valor padrão
  onDragStart 
}) => {
  const commandBlocks = getCommandBlocks().filter(
    block => availableCommands.includes(block.id)
  );
  
  // Filtra sensores disponíveis
  const sensorBlocks = Object.values(sensorObjects)
    .filter(sensor => availableSensors.includes(sensor.sensorType))
    .map(sensor => ({
      id: sensor.id,
      name: sensor.name,
      type: 'sensor',
      description: sensor.description,
      sensorType: sensor.sensorType
    }));
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-white/90">Blocos Disponíveis</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-white/70">Comandos</h4>
        <div className="flex flex-wrap gap-2">
          {commandBlocks.map((block) => (
            <DraggableBlock 
              key={block.id} 
              block={block} 
              onDragStart={onDragStart} 
              className="palette-block min-w-[90px] min-h-[20px] flex items-center justify-center"
            />
          ))}
        </div>
      </div>
      
      {sensorBlocks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2 text-white/70">Sensores</h4>
          <div className="flex flex-wrap gap-2">
            {sensorBlocks.map((block) => (
              <DraggableBlock 
                key={block.id} 
                block={block} 
                onDragStart={onDragStart} 
                className="palette-block sensor-block min-w-[90px] min-h-[20px] flex items-center justify-center"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
