
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import { Level } from '@/types/levelTypes';
import gameEngine, { Command, GameState } from '@/engine';
import { useToast } from '@/hooks/use-toast';
import { getLevel } from '@/data/level/levelManager';
import PlaygroundTab from '@/components/tabs/PlaygroundTab';

const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>();
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load level based on URL parameter
    const id = Number(levelId);
    const level = getLevel(id);
    
    if (!level || !level.unlocked) {
      // If level doesn't exist or is locked, redirect to home
      navigate('/');
      return;
    }
    
    setCurrentLevel(level);
    gameEngine.loadLevel(level);
    setIsComplete(false);
  }, [levelId, navigate]);

  useEffect(() => {
    gameEngine.onUpdate((state) => {
      setGameState(state);
      setIsComplete(state.isComplete);
    });
  }, [isComplete, toast]);

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'levels') {
      navigate('/');
    } else if (tab === 'learn') {
      navigate('/');
    }
  };

  const handleRunCode = (commands: Command[]) => {
    gameEngine.setCommands(commands);
    gameEngine.start();
  };

  const handleStopCode = () => {
    gameEngine.stop();
  };

  const handleResetCode = () => {
    gameEngine.reset();
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="playground" onTabChange={handleTabChange} />
      
      <div className="py-4">
        {currentLevel && (
          <PlaygroundTab 
            currentLevel={currentLevel}
            gameState={gameState}
            isComplete={isComplete}
            onRunCode={handleRunCode}
            onStopCode={handleStopCode}
            onResetCode={handleResetCode}
            onNavigate={handleTabChange}
          />
        )}
      </div>
    </div>
  );
};

export default LevelPage;
