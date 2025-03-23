import React, { useState, useRef } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  X, 
  RotateCw, 
  RotateCcw,
  GitBranch,
  Repeat,
  Paintbrush
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command } from '@/engine/types';
import { CommandBlockProps } from './types';
import DropIndicator from './DropIndicator';
import DropZone from './DropZone';
import CommandControls from './CommandControls';

const CommandBlock: React.FC<CommandBlockProps> = ({ 
  command, 
  path, 
  onRemove, 
  onUpdate, 
  onMoveCommand,
  isRunning
}) => {
  const [showDropBefore, setShowDropBefore] = useState(false);
  const [showDropAfter, setShowDropAfter] = useState(false);
  const [showDropInside, setShowDropInside] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    // Store the path as serialized JSON
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'command',
      path
    }));
    // Set a ghost image
    if (blockRef.current) {
      const rect = blockRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(blockRef.current, e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => {
    e.preventDefault();
    e.stopPropagation();

    // Get drag data
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    try {
      const dragData = JSON.parse(data);
      
      // Don't show indicators if dragging over itself
      if (dragData.type === 'command') {
        const dragPath = dragData.path;
        // Check if dragging onto itself or its parent
        const isSelf = JSON.stringify(dragPath) === JSON.stringify(path);
        const isParent = Array.isArray(dragPath) && 
                        dragPath.length < path.length && 
                        path.every((segment, i) => i >= dragPath.length || segment === dragPath[i]);
        
        if (isSelf || isParent) return;
      }

      // Prioritize inserting inside the block when it's a loop or conditional
      if (canHaveChildren && position !== 'inside') {
        // If we're over a block that can have children, prioritize the "inside" mode
        setShowDropInside(true);
        setShowDropBefore(false);
        setShowDropAfter(false);
        return;
      }

      // Show the appropriate drop indicator
      if (position === 'before') setShowDropBefore(true);
      else if (position === 'after') setShowDropAfter(true);
      else if (position === 'inside' && canHaveChildren) setShowDropInside(true);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleDragLeave = () => {
    setShowDropBefore(false);
    setShowDropAfter(false);
    setShowDropInside(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropBefore(false);
    setShowDropAfter(false);
    setShowDropInside(false);

    // Get drag data
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    try {
      const dragData = JSON.parse(data);
      
      // If we're over a block that can have children, prioritize putting inside
      if (canHaveChildren && position !== 'inside') {
        position = 'inside';
      }
      
      if (dragData.type === 'command') {
        const dragPath = dragData.path;
        
        // Check if dragging onto itself or its parent
        const isSelf = JSON.stringify(dragPath) === JSON.stringify(path);
        const isParent = Array.isArray(dragPath) && 
                        dragPath.length < path.length && 
                        path.every((segment, i) => i >= dragPath.length || segment === dragPath[i]);
        
        if (isSelf || isParent) return;
        
        // If it's a valid drop, move the command
        onMoveCommand(dragPath, path, position);
      } else if (dragData.type === 'block') {
        // This is a new block from the palette
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
        }
        else if (block.id === 'while' ) {
          newCommand.params = { condition: 'isGreen' };
          newCommand.children = [];
        }
        
        // Insert the new command at the drop position
        onMoveCommand([], path, position, newCommand);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  // Determine the icon for this command
  const getIcon = () => {
    switch (command.id) {
      case 'moveForward': return ArrowUp;
      case 'moveBackward': return ArrowDown;
      case 'turnRight': return RotateCw;
      case 'turnLeft': return RotateCcw;
      case 'repeat': return RefreshCw;
      case 'while': return Repeat;
      case 'if': return GitBranch;
      case 'paintGreen': return Paintbrush;
      default: return ArrowUp;
    }
  };

  // Determine the CSS class for this command
  const getBlockClass = () => {
    if (command.id === 'moveForward' || command.id === 'moveBackward') return 'control-block';
    if (command.id === 'turnRight' || command.id === 'turnLeft') return 'control-block';
    if (command.id === 'repeat') return 'loop-block';
    if (command.id === 'while') return 'loop-block while-block';
    if (command.id === 'if') return 'condition-block';
    if (command.id === 'paintGreen') return 'action-block';
    return 'control-block';
  };

  const canHaveChildren = command.id === 'repeat' || command.id === 'if' || command.id === 'while';
  const indent = path.length - 1;
  const Icon = getIcon();
  const blockClass = getBlockClass();

  const handleCommandUpdate = (updatedCommand: Command) => {
    onUpdate(path, updatedCommand);
  };

  return (
    <div 
      className="mb-2 relative"
      style={{ marginLeft: `${indent * 20}px` }}
      ref={blockRef}
    >
      {/* Drop indicator - Before */}
      <DropIndicator position="before" show={showDropBefore} />

      {/* Drop Zone - Before */}
      <DropZone 
        position="before" 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      <div 
        className={`code-block ${blockClass} relative group px-2 py-1 inline-flex ${isDragging ? 'opacity-50' : ''} ${showDropInside ? 'ring-2 ring-white/50' : ''}`}
        draggable={!isRunning}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => handleDragOver(e, 'inside')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'inside')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Icon className="h-3 w-3 flex-shrink-0" />
            <span className="text-xs">{command.name}</span>
            
            <CommandControls 
              command={command}
              isRunning={isRunning}
              onUpdate={handleCommandUpdate}
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-white/70 hover:text-white hover:bg-red-500/20 ml-1 p-0"
            disabled={isRunning}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(path);
            }}
          >
            <X className="h-2 w-2" />
          </Button>
        </div>
      </div>

      {/* Render children if this command can have them */}
      {canHaveChildren && (
        <div className="pl-2 border-l-2 border-l-white/10 ml-4 min-h-7 mt-1">
          {command.children?.map((child, index) => (
            <CommandBlock
              key={index}
              command={child}
              path={[...path, index]}
              onRemove={onRemove}
              onUpdate={onUpdate}
              onMoveCommand={onMoveCommand}
              isRunning={isRunning}
            />
          ))}
          
          {!isRunning && (
            <div 
              className="py-2"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDropAfter(true);
              }}
              onDragLeave={() => setShowDropAfter(false)}
              onDrop={(e) => handleDrop(e, 'inside')}
            />
          )}
        </div>
      )}

      {/* Drop indicator - After */}
      <DropIndicator position="after" show={showDropAfter} />

      {/* Drop Zone - After */}
      <DropZone 
        position="after" 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default CommandBlock;
