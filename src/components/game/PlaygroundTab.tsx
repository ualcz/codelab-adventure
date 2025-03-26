
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket, Trophy} from 'lucide-react';
import CodeBlocks from '@/components/code/CodeBlocks';
import GameCanvas from '@/components/game/GameCanvas';
import { Command, GameState } from '@/engine';
import { getLevel } from '@/data/level/levelManager';
import { Level } from '@/types/levelTypes';
import { useNavigate } from 'react-router-dom';

interface PlaygroundTabProps {
  currentLevel?: Level;
  gameState: GameState;
  isComplete: boolean;
  onRunCode: (commands: Command[]) => void;
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
  const navigate = useNavigate();
  
  // Force reset when mission fails
  React.useEffect(() => {
    if (gameState.isFailed) {
      // We don't need to call reset here as the game engine already handles it
      // This is just to ensure the UI updates properly
      console.log("Mission failed detected in PlaygroundTab");
    }
  }, [gameState.isFailed]);
  
  // Save progress when level is completed
  React.useEffect(() => {
    if (isComplete && currentLevel) {
      // Game engine already handles saving progress to localStorage
      console.log(`Level ${currentLevel.id} completed! Progress saved.`);
    }
  }, [isComplete, currentLevel]);
  
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost"
            className="mr-4 text-white hover:bg-white/5"
            onClick={() => navigate('/') /* Navigate back to levels tab on home page */}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Rocket className="h-6 w-6 mr-2 text-game-warning" />
            {currentLevel ? `Nível ${currentLevel.id}: ${currentLevel.name}` : 'Playground'}
          </h2>
        </div>
        
        {isComplete && (
          <Button 
            className="game-btn bg-gradient-to-r from-game-primary to-game-success text-white"
            onClick={() => {
              // Load next level if available
              if (currentLevel) {
                const nextLevel = getLevel(currentLevel.id + 1);
                if (nextLevel && nextLevel.unlocked) {
                  navigate(`/level/${nextLevel.id}`);
                } else {
                  navigate('/');
                }
              }
            }}
          >
            <Trophy className="h-4 w-4 mr-2" />
            {currentLevel && getLevel(currentLevel.id + 1) ? 'Próximo Nível' : 'Voltar aos Níveis'}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeBlocks 
          availableCommands={currentLevel?.availableCommands || ["moveForward", "turnRight", "turnLeft", "stop", "repeat", "if", "function"]}
          onRun={onRunCode}
          onStop={onStopCode}
          onReset={onResetCode}
          isRunning={gameState.isRunning}
        />
        
        <GameCanvas 
          gameState={gameState}
          currentLevel={currentLevel}
          isComplete={isComplete}
          onReset={onResetCode}
        />
      </div>
    </div>
  );
};

export default PlaygroundTab;
