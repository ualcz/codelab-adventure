
import React from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import { Level } from '@/types/levelTypes';
import { Command, GameState } from '@/engine';
import SensorAwareCodeBlocks from './SensorAwareCodeBlocks';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Hash } from 'lucide-react';

interface PlaygroundTabProps {
  currentLevel: Level;
  gameState: GameState;
  isComplete: boolean;
  onRunCode: (commands: Command[]) => void;
  onStopCode: () => void;
  onResetCode: () => void;
  onNavigate: (tab: string) => void;
  onCommandsChange: (commands: Command[]) => void;
}

const PlaygroundTab: React.FC<PlaygroundTabProps> = ({ 
  currentLevel, 
  gameState, 
  isComplete, 
  onRunCode, 
  onStopCode, 
  onResetCode,
  onNavigate,
  onCommandsChange
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Back Button and Level Info */}
      <div className="flex justify-between items-center">
        <Button 
          className="flex items-center gap-2" 
          onClick={() => onNavigate('levels')}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Níveis
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center bg-game-primary/20 text-game-primary rounded-full px-3 py-1">
            <Hash className="h-4 w-4 mr-1" />
            Nível {currentLevel.id}
          </span>
        </div>
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
            onCommandsChange={onCommandsChange}
            gameState={gameState}
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
