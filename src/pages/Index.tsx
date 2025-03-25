
import { useState, useEffect } from 'react';
import GameHeader from '@/components/GameHeader';
import { Level } from '@/types/levelTypes';
import gameEngine, { Command, GameState } from '@/engine';
import { useToast } from '@/hooks/use-toast';

import HomeTab from '@/components/tabs/HomeTab';
import LevelsTab from '@/components/tabs/LevelsTab';
import PlaygroundTab from '@/components/tabs/PlaygroundTab';
import LearnTab from '@/components/tabs/LearnTab';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>();
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    gameEngine.onUpdate((state) => {
      setGameState(state);
      setIsComplete(state.isComplete);
    });
  }, [isComplete, toast]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleSelectLevel = (level: Level) => {
    setCurrentLevel(level);
    gameEngine.loadLevel(level);
    setIsComplete(false);
    setCurrentTab('playground');
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
      <GameHeader currentTab={currentTab} onTabChange={handleTabChange} />
      
      <div className="py-4">
        {currentTab === 'home' && <HomeTab onNavigate={handleTabChange} />}
        {currentTab === 'levels' && (
          <LevelsTab 
            onSelectLevel={handleSelectLevel} 
            currentLevelId={currentLevel?.id} 
            onNavigate={handleTabChange} 
          />
        )}
        {currentTab === 'playground' && (
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
        {currentTab === 'learn' && <LearnTab onNavigate={handleTabChange} />}
      </div>
    </div>
  );
};

export default Index;
