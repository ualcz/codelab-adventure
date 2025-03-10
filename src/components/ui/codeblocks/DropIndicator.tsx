
import React from 'react';

interface DropIndicatorProps {
  position: 'before' | 'after';
  show: boolean;
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ position, show }) => {
  if (!show) return null;
  
  return (
    <div 
      className={`absolute h-1 bg-white/50 w-full ${position === 'before' ? '-top-1' : '-bottom-1'} rounded-full`}
    />
  );
};

export default DropIndicator;
