
import React from 'react';

interface DropZoneProps {
  position: 'before' | 'after';
  onDragOver: (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => void;
}

const DropZone: React.FC<DropZoneProps> = ({ position, onDragOver, onDragLeave, onDrop }) => {
  return (
    <div 
      className={`absolute left-0 right-0 h-2 ${position === 'before' ? 'top-[-4px]' : 'bottom-[-4px]'} z-10`}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e, position);
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, position)}
    />
  );
};

export default DropZone;
