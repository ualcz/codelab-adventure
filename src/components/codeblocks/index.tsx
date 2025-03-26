import React, { useState } from 'react';
import { Command } from '@/types/GameTypes';
import { Play, Square, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommandPalette from './components/CommandPalette';
import CommandList from '@/components/tabs/CommandList';
import { CodeBlocksProps } from './types';
import gameEngine from '@/engine/index';

const CodeBlocks: React.FC<CodeBlocksProps> = ({ 
  availableCommands,
  onRun,
  onStop,
  onReset,
  isRunning
}) => {
  const [commands, setCommands] = useState<Command[]>([]);
  
  const handleCommandsChange = (newCommands: Command[]) => {
    setCommands(newCommands);
    // Update the gameEngine with new commands to recalculate used blocks
    gameEngine.setCommands(newCommands);
  };
  
  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'block',
      block
    }));
  };
  
  const handleRun = () => {
    onRun(commands);
  };
  
  const handleStop = () => {
    onStop();
  };
  
  const handleReset = () => {
    onReset();
  };
  
  const handleClear = () => {
    handleCommandsChange([]);
    gameEngine.resetAll();
  };
  
  return (
    <div className="flex flex-col h-full gap-4">
      <CommandPalette 
        availableCommands={availableCommands} 
        onDragStart={handleDragStart} 
      />
      
      <CommandList 
        commands={commands} 
        onCommandsChange={handleCommandsChange}
        isRunning={isRunning}
      />
      
      <div className="flex gap-2 justify-between">
        <Button 
          className="game-btn game-btn-secondary flex-1"
          onClick={handleClear}
          disabled={isRunning}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpar
        </Button>
        
        <div className="flex gap-2 flex-1">
          <Button 
            className="game-btn game-btn-primary flex-1"
            onClick={isRunning ? handleStop : handleRun}
            disabled={commands.length === 0}
          >
            {isRunning ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Parar
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Executar
              </>
            )}
          </Button>
          
          <Button 
            variant="outline"
            className="game-btn flex-1 border-game-primary/50 text-game-primary hover:bg-game-primary/10"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
