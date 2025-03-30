
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/shared/GameHeader';
import { Level } from '@/types/levelTypes';
import gameEngine, { Command, GameState } from '@/engine';
import { useToast } from '@/hooks/use-toast';
import { getLevel } from '@/data/level/levelManager';
import PlaygroundTab from '@/components/game/PlaygroundTab';
import Footer from '@/components/shared/footer';

const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>();
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {

    const id = Number(levelId);
    const level = getLevel(id);
    
    if (!level || !level.unlocked) {
      navigate('/');
      return;
    }
    
    setCurrentLevel(level);
    gameEngine.loadLevel(level);
    

    gameEngine.reset();
    setGameState(gameEngine.getState());
    setIsComplete(false);
    
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
    
 
    return () => {
      gameEngine.onUpdate(() => {});
    };
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'levels') {
      navigate('/levels');
    } else if (tab === 'learn') {
      navigate('/learn');
    }
  };

  const handleCommandsChange = (commands: Command[]) => {
    gameEngine.setCommands(commands);
    setGameState({...gameEngine.getState()});
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
            onCommandsChange={handleCommandsChange}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LevelPage;
