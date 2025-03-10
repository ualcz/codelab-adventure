
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface EmptyDropAreaProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const EmptyDropArea: React.FC<EmptyDropAreaProps> = ({ onDrop }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center h-[300px] text-white/50"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-white/5');
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('bg-white/5');
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-white/5');
        onDrop(e);
      }}
    >
      <ChevronDown className="h-10 w-10 mb-2 animate-bounce" />
      <p>Arraste blocos de código para cá...</p>
    </div>
  );
};

export default EmptyDropArea;
