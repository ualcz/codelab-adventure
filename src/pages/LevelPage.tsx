import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/Header/GameHeader';
import { Level } from '@/types/levelTypes';
import gameEngine, { Command, GameState } from '@/engine';
import { useToast } from '@/hooks/use-toast';
import { getLevel } from '@/data/level/levelManager';
import PlaygroundTab from '@/components/game/PlaygroundTab';

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
    
    // Force a reset and update after loading the level
    gameEngine.reset();
    setGameState(gameEngine.getState());
    setIsComplete(false);
    
    // Force an update to ensure the canvas renders correctly
    setTimeout(() => {
      gameEngine.notifyUpdate();
    }, 100);
  }, [levelId, navigate]);

  useEffect(() => {
    const updateHandler = (state: GameState) => {
      setGameState(state);
      setIsComplete(state.isComplete);
    };
    
    gameEngine.onUpdate(updateHandler);
    
    // Cleanup function to prevent memory leaks
    return () => {
      // This is a hack since there's no direct way to remove the listener
      gameEngine.onUpdate(() => {});
    };
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'levels') {
      navigate('/', { state: { initialTab: 'levels' } });
    } else if (tab === 'learn') {
      navigate('/', { state: { initialTab: 'learn' } });
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
