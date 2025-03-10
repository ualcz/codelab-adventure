
import React from 'react';

interface DropIndicatorProps {
  position: 'before' | 'after';
  show: boolean;
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ position, show }) => {
  if (!show) return null;
  
  return (
    <div 
      className={`absolute left-0 right-0 h-1 bg-game-primary animate-pulse z-10 ${position === 'before' ? 'top-0' : 'bottom-0'}`} 
    />
  );
};

export default DropIndicator;
