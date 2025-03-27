
import React from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  ChevronDown, 
  RotateCw, 
  RotateCcw,
  Pause,
  PaintBucket,
  Split,
  Repeat,
  Target,
  Square,
  Circle,
  Shield,
  Sparkles,
  Bug
} from 'lucide-react';
import { DraggableBlockProps } from '@/components/types';

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, onDragStart, className }) => {
  const getIcon = () => {
    switch (block.icon) {
      case 'arrow-up': return ArrowUp;
      case 'arrow-down': return ArrowDown;
      case 'rotate-cw': return RotateCw;
      case 'rotate-ccw': return RotateCcw;
      case 'repeat': return Repeat;
      case 'split': return Split;
      case 'code': return ChevronDown;
      case 'pause': return Pause;
      case 'paintbrush': 
      case 'paint': return PaintBucket;
      case 'refreshCw': return RefreshCw;
      case 'shield': return Shield;
      case 'square': return Square;
      case 'coins': return Sparkles;
      case 'target': return Target;
      case 'circle': return Circle;
      default: return  Bug;
    }
  };

  const getBlockClass = () => {
    if (block.type === 'control') return 'control-block';
    if (block.type === 'loop') return 'loop-block';
    if (block.type === 'condition') return 'condition-block';
    if (block.type === 'action') return 'action-block';
    if (block.type === 'sensor') return 'sensor-block';
    return '';
  };

  const getIconClass = () => {
    if (block.id.includes('sensor_redCell')) return 'text-red-400';
    if (block.id.includes('sensor_greenCell')) return 'text-green-400';
    return '';
  };

  const LucideIcon = getIcon();
  const blockClass = getBlockClass();
  const iconClass = getIconClass();

  return (
    <div 
      className={`code-block ${blockClass} animate-scale-in inline-block max-w-[200px] ${className || ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, block)}
    >
      <div className="flex p-1 items-center gap-1">
        <LucideIcon className={`h-5 w-5 flex-shrink-0 ${iconClass}`} />
        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{block.name}</span>
      </div>
    </div>
  );
};

export default DraggableBlock;
