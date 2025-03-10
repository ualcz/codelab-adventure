
import React from 'react';

interface DropZoneProps {
  position: 'before' | 'after' | 'inside';
  onDragOver: (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, position: 'before' | 'after' | 'inside') => void;
}

const DropZone: React.FC<DropZoneProps> = ({ position, onDragOver, onDragLeave, onDrop }) => {
  return (
    <div 
      className={`absolute h-6 w-full ${position === 'before' ? '-top-3' : position === 'after' ? '-bottom-3' : 'inset-0'}`}
      onDragOver={(e) => onDragOver(e, position)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, position)}
    />
  );
};

export default DropZone;
