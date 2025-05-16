
import React from 'react';
import { Command } from '@/types/GameTypes';
import CommandBlock from '@/components/code/blocks/CommandBlock';
import EmptyDropArea from '@/components/ui/codeblocks/EmptyDropArea';
import { 
  removeCommand, 
  updateCommand, 
  hasNestedRepeats, 
  addDummyCommand 
} from '@/components/utils/commandUtils';
import { moveCommand } from '@/components/utils/moveCommand';

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

  const handleCommandsChange = (newCommands: Command[]) => {
    const processedCommands = linkElseBlocksToIfBlocks(newCommands);
    
    if (hasNestedRepeats(processedCommands)) {
      const commandsWithDummy = addDummyCommand(processedCommands);
      onCommandsChange(commandsWithDummy);
    } else {
      const filteredCommands = processedCommands.filter(cmd => !cmd.params?.isDummy);
      onCommandsChange(filteredCommands);
    }
  };

  const linkElseBlocksToIfBlocks = (cmds: Command[]): Command[] => {
    const newCommands = JSON.parse(JSON.stringify(cmds));
    
    processCommandLevel(newCommands);
    
    return newCommands;
  };

  const processCommandLevel = (commands: Command[]) => {
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].id === 'else') {
        let foundIf = false;
        for (let j = i - 1; j >= 0; j--) {
          if (commands[j].id === 'if') {
            foundIf = true;
            break;
          }
        }
        
        commands[i].params = commands[i].params || {};
        commands[i].params.executionState = {
          shouldExecute: false,
          counter: 0,
          childIndex: 0,
          completed: false
        };
      }
      
      if (commands[i].children && commands[i].children.length > 0) {
        processCommandLevel(commands[i].children);
      }
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
          newCommand.children = [];
        } else if (block.id === 'while') {
          newCommand.children = [];
        } else if (block.id === 'else') {
          newCommand.children = [];
          newCommand.params = { 
            executionState: { 
              shouldExecute: false,
              counter: 0,
              childIndex: 0,
              completed: false
            }
          };
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
          newCommand.children = [];
        } else if (block.id === 'while') {
          newCommand.children = [];
        } else if (block.id === 'else') {
          newCommand.children = [];
          newCommand.params = { 
            executionState: { 
              shouldExecute: false,
              counter: 0,
              childIndex: 0,
              completed: false 
            } 
          };
        }
        
        handleCommandsChange([...commands, newCommand]);
      }
    } catch (error) {
      console.error('Error handling drop at end:', error);
    }
  };

  return (
    <div className="p-4 h-[450px] overflow-y-auto ">
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
