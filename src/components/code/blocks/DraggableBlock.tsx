
import React from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  ChevronDown, 
  RotateCw, 
  RotateCcw,
  Pause,
  Paintbrush,
  GitBranch,
  Repeat,
  Target,
  Square,
  Circle,
  Shield,
  Coins
} from 'lucide-react';
import { DraggableBlockProps } from '@/components/types';

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, onDragStart, className }) => {
  const getIcon = () => {
    switch (block.icon) {
      case 'arrow-up': return ArrowUp;
      case 'arrow-down': return ArrowDown;
      case 'rotate-cw': return RotateCw;
      case 'rotate-ccw': return RotateCcw;
      case 'repeat': return RefreshCw;
      case 'git-branch': return GitBranch;
      case 'code': return ChevronDown;
      case 'pause': return Pause;
      case 'paintbrush': return Paintbrush;
      case 'while': return Repeat;
      case 'shield': return Shield;
      case 'square': return Square;
      case 'coins': return Coins;
      case 'target': return Target;
      case 'circle': return Circle;
      default: return ArrowUp;
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
      className={`code-block ${blockClass} animate-scale-in inline-block max-w-[110px] ${className || ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, block)}
    >
      <div className="flex items-center gap-1">
        <LucideIcon className={`h-3 w-3 flex-shrink-0 ${iconClass}`} />
        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{block.name}</span>
      </div>
    </div>
  );
};

export default DraggableBlock;
