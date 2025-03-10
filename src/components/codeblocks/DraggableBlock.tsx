import React from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  ChevronDown, 
  RotateCw, 
  RotateCcw,
  Pause
} from 'lucide-react';
import { DraggableBlockProps } from './types';

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, onDragStart, className }) => {
  const LucideIcon = React.useMemo(() => {
    switch (block.icon) {
      case 'arrow-up': return ArrowUp;
      case 'arrow-down': return ArrowDown;
      case 'rotate-cw': return RotateCw;
      case 'rotate-ccw': return RotateCcw;
      case 'repeat': return RefreshCw;
      case 'git-branch': return ChevronDown;
      case 'code': return ChevronDown;
      case 'pause': return Pause;
      default: return ArrowUp;
    }
  }, [block.icon]);

  let blockClass = '';
  if (block.type === 'control') blockClass = 'control-block';
  if (block.type === 'loop') blockClass = 'loop-block';
  if (block.type === 'condition') blockClass = 'condition-block';

  return (
    <div 
      className={`code-block ${blockClass} animate-scale-in inline-block max-w-[110px] ${className || ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, block)}
    >
      <div className="flex items-center gap-1">
        <LucideIcon className="h-3 w-3 flex-shrink-0" />
        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{block.name}</span>
      </div>
    </div>
  );
};

export default DraggableBlock;
