
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandControlsProps } from '@/components/types';

const CommandControls: React.FC<CommandControlsProps> = ({ command, isRunning, onUpdate }) => {
  // Repeat Controls
  if (command.id === 'repeat') {
    return (
      <div className="flex items-center gap-1 ml-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 text-white bg-white/10 hover:bg-white/20 p-0"
          disabled={isRunning}
          onClick={(e) => {
            e.stopPropagation();
            const count = command.params?.count || 3;
            onUpdate({
              ...command,
              params: { ...command.params, count: Math.max(2, count - 1) }
            });
          }}
        >
          <Minus className="h-2 w-2" />
        </Button>
        
        <span className="text-xs bg-white/10 px-1 py-0.5 rounded">
          {command.params?.count || 3}x
        </span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 text-white bg-white/10 hover:bg-white/20 p-0"
          disabled={isRunning}
          onClick={(e) => {
            e.stopPropagation();
            const count = command.params?.count || 3;
            onUpdate({
              ...command,
              params: { ...command.params, count: count + 1 }
            });
          }}
        >
          <Plus className="h-2 w-2" />
        </Button>
      </div>
    );
  }

  if (command.id === 'while') {
    return null;
  }
  
  // If Controls
  if (command.id === 'if') {
    return null;
  }
  
  // Turn Controls
  if (command.id === 'turnRight' || command.id === 'turnLeft') {
    return (
      <div className="flex items-center gap-1 ml-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 text-white bg-white/10 hover:bg-white/20 p-0"
          disabled={isRunning}
          onClick={(e) => {
            e.stopPropagation();
            const count = command.params?.count || 1;
            onUpdate({
              ...command,
              params: { ...command.params, count: Math.max(1, count - 1) }
            });
          }}
        >
          <Minus className="h-2 w-2" />
        </Button>
        
        <span className="text-xs bg-white/10 px-1 py-0.5 rounded">
          {(command.params?.count || 1) * 90}°
        </span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 text-white bg-white/10 hover:bg-white/20 p-0"
          disabled={isRunning}
          onClick={(e) => {
            e.stopPropagation();
            const count = command.params?.count || 1;
            onUpdate({
              ...command,
              params: { ...command.params, count: count + 1 }
            });
          }}
        >
          <Plus className="h-2 w-2" />
        </Button>
      </div>
    );
  }
  
  return null;
};

export default CommandControls;
