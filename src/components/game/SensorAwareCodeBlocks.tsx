
import React, { useState } from 'react';
import { Command } from '@/types/GameTypes';
import CommandPalette from '../code/CommandPalette';
import CommandList from './CommandList';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Play, Trash, RefreshCw } from 'lucide-react';

// Esta é uma versão simplificada do CodeBlocks que suporta sensores
interface SensorAwareCodeBlocksProps {
  availableCommands: string[];
  availableSensors?: string[];
  onRun: (commands: Command[]) => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const SensorAwareCodeBlocks: React.FC<SensorAwareCodeBlocksProps> = ({
  availableCommands,
  availableSensors = [],
  onRun,
  onStop,
  onReset,
  isRunning
}) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'block',
      block
    }));
  };

  const handleCommandsChange = (newCommands: Command[]) => {
    setCommands(newCommands);
  };

  const handleRunCode = () => {
    if (commands.length === 0) {
      toast({
        title: "Nenhum comando",
        description: "Adicione comandos antes de executar o programa",
        variant: "destructive",
      });
      return;
    }
    onRun(commands);
  };

  const handleClearCommands = () => {
    setCommands([]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Available Commands Section */}
      <div className="glass-panel border border-white/10 p-4 rounded-md">
        <CommandPalette 
          availableCommands={availableCommands} 
          availableSensors={availableSensors}
          onDragStart={handleDragStart} 
        />
      </div>
      
      {/* Program Section */}
      <div className="glass-panel border border-white/10 p-4 rounded-md flex-1">
        <h3 className="text-lg font-medium mb-4 text-white/90">Programa</h3>
        <CommandList 
          commands={commands} 
          onCommandsChange={handleCommandsChange} 
          isRunning={isRunning}
        />
      </div>
      
      {/* Control Buttons Section */}
      <div className="grid grid-cols-3 gap-2">
        <Button 
          onClick={handleClearCommands} 
          disabled={isRunning || commands.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Trash className="mr-2 h-4 w-4" />
          Limpar
        </Button>
        
        <Button 
          onClick={handleRunCode} 
          disabled={isRunning || commands.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Play className="mr-2 h-4 w-4" />
          Executar
        </Button>
        
        <Button 
          onClick={onReset} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default SensorAwareCodeBlocks;
