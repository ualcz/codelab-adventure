
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
    switch (block.id) {
      case 'moveForward': return ArrowUp;
      case 'moveBackward': return ArrowDown;
      case 'turnRight': return RotateCw;
      case 'turnLeft': return RotateCcw;
      case 'repeat': return Repeat;
      case 'if': return Split;
      case 'stop': return Pause;
      case 'paintGreen': return PaintBucket;
      case 'while': return RefreshCw;
      case 'sensor_barrier': return Shield;
      case 'sensor_border': return Square;
      case 'sensor_collectible': return Sparkles;
      case 'sensor_target': return Target;
      case 'sensor_redCell': return Circle;
      case 'sensor_greenCell': return Circle;
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
