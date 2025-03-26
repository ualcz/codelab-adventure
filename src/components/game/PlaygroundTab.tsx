
import React from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import { Level } from '@/types/levelTypes';
import { GameState } from '@/engine';
import SensorAwareCodeBlocks from './SensorAwareCodeBlocks';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PlaygroundTabProps {
  currentLevel: Level;
  gameState: GameState;
  isComplete: boolean;
  onRunCode: (commands: any[]) => void;
  onStopCode: () => void;
  onResetCode: () => void;
  onNavigate: (tab: string) => void;
}

const PlaygroundTab: React.FC<PlaygroundTabProps> = ({ 
  currentLevel, 
  gameState, 
  isComplete, 
  onRunCode, 
  onStopCode, 
  onResetCode,
  onNavigate
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Back Button */}
      <div className="flex justify-start">
        <Button 
          className="flex items-center gap-2" 
          onClick={() => onNavigate('levels')}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Níveis
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor and Command Palette - Now on the left */}
        <div className="col-span-1">
          <SensorAwareCodeBlocks
            availableCommands={currentLevel.availableCommands}
            availableSensors={currentLevel.availableSensors}
            onRun={onRunCode}
            onStop={onStopCode}
            onReset={onResetCode}
            isRunning={gameState.isRunning}
          />
        </div>
        
        {/* Game Canvas - Now on the right */}
        <div className="col-span-1">
          <GameCanvas 
            gameState={gameState} 
            currentLevel={currentLevel} 
            isComplete={isComplete} 
            onReset={onResetCode}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundTab;
