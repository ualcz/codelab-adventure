import React from 'react';
import { Command } from '@/engine/types';
import CommandBlock from './CommandBlock';
import EmptyDropArea from './EmptyDropArea';
import { 
  removeCommand, 
  updateCommand, 
  hasNestedRepeats, 
  addDummyCommand 
} from './utils/commandUtils';
import { moveCommand } from './utils/moveCommand';

interface CommandListProps {
  commands: Command[];
  onCommandsChange: (commands: Command[]) => void;
  isRunning: boolean;
}

const CommandList: React.FC<CommandListProps> = ({ 
  commands, 
  onCommandsChange, 
  isRunning 
}) => {  
  const handleRemoveCommand = (path: (number | string)[]) => {
    const newCommands = removeCommand(commands, path);
    handleCommandsChange(newCommands);
  };
  
  const handleUpdateCommand = (path: (number | string)[], command: Command) => {
    const newCommands = updateCommand(commands, path, command);
    handleCommandsChange(newCommands);
  };
  
  const handleMoveCommand = (
    dragPath: (number | string)[], 
    dropPath: (number | string)[], 
    position: 'before' | 'after' | 'inside',
    newCommand?: Command
  ) => {
    const newCommands = moveCommand(commands, dragPath, dropPath, position, newCommand);
    handleCommandsChange(newCommands);
  };

  // Modifies the onCommandsChange to add the dummy command if needed
  const handleCommandsChange = (newCommands: Command[]) => {
    // Check if there are nested repeats
    if (hasNestedRepeats(newCommands)) {
      // Add the dummy command only if there are nested repeats
      const commandsWithDummy = addDummyCommand(newCommands);
      onCommandsChange(commandsWithDummy);
    } else {
      // Remove any existing dummy command
      const filteredCommands = newCommands.filter(cmd => !cmd.params?.isDummy);
      onCommandsChange(filteredCommands);
    }
  };

  const handleEmptyAreaDrop = (e: React.DragEvent<HTMLDivElement>) => {
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (!data) return;
      
      const dragData = JSON.parse(data);
      
      if (dragData.type === 'block') {
        const block = dragData.block;
        const newCommand: Command = {
          id: block.id,
          name: block.name
        };
        
        if (block.id === 'repeat') {
          newCommand.params = { count: 3 };
          newCommand.children = [];
        } else if (block.id === 'if') {
          newCommand.params = { condition: 'isGreen' };
          newCommand.children = [];
        } else if (block.id === 'while') {
          newCommand.params = { condition: 'untilGreen' };
          newCommand.children = [];
        }
        
        handleCommandsChange([...commands, newCommand]);
      }
    } catch (error) {
      console.error('Error handling drop in empty area:', error);
    }
  };

  const handleEndDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-white/5');
    
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (!data) return;
      
      const dragData = JSON.parse(data);
      
      if (dragData.type === 'command') {
        // Move an existing command to the end
        handleMoveCommand(dragData.path, [], 'after');
      } else if (dragData.type === 'block') {
        // Add a new block from the palette
        const block = dragData.block;
        const newCommand: Command = {
          id: block.id,
          name: block.name
        };
        
        // Add params for specific block types
        if (block.id === 'repeat') {
          newCommand.params = { count: 3 };
          newCommand.children = [];
        } else if (block.id === 'if') {
          newCommand.params = { condition: 'isGreen' };
          newCommand.children = [];
        } else if (block.id === 'while') {
          newCommand.params = { condition: 'untilGreen' };
          newCommand.children = [];
        }
        
        handleCommandsChange([...commands, newCommand]);
      }
    } catch (error) {
      console.error('Error handling drop at end:', error);
    }
  };

  return (
    <div className="glass-panel border border-white/10 p-4 h-[450px] overflow-y-auto rounded-md">
      <h3 className="text-lg font-medium mb-4 text-white/90">Programa</h3>
      
      {commands.length === 0 ? (
        <EmptyDropArea onDrop={handleEmptyAreaDrop} />
      ) : (
        <div>
          {commands.map((command, index) => (
            // Don't render if it's a dummy command
            !command.params?.isDummy && (
              <CommandBlock
                key={index}
                command={command}
                path={[index]}
                onRemove={handleRemoveCommand}
                onUpdate={handleUpdateCommand}
                onMoveCommand={handleMoveCommand}
                isRunning={isRunning}
              />
            )
          ))}
          
          {/* Empty area at the end for dropping */}
          {!isRunning && (
            <div 
              className="h-20"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('bg-white/5');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('bg-white/5');
              }}
              onDrop={handleEndDrop}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommandList;
