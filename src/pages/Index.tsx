
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/Header/GameHeader';

import HomeTab from '@/components/home/HomeTab';
import LevelsTab from '@/components/level/LevelsTab';
import LearnTab from '@/components/Lean/LearnTab';
import { Level } from '@/types/levelTypes';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleSelectLevel = (level: Level) => {
    // Navigate to the level page instead of switching tabs
    navigate(`/level/${level.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab={currentTab} onTabChange={handleTabChange} />
      
      <div className="py-4">
        {currentTab === 'home' && <HomeTab onNavigate={handleTabChange} />}
        {currentTab === 'levels' && (
          <LevelsTab 
            onSelectLevel={handleSelectLevel} 
            currentLevelId={undefined} 
            onNavigate={handleTabChange} 
          />
        )}
        {currentTab === 'learn' && <LearnTab onNavigate={handleTabChange} />}
      </div>
    </div>
  );
};

export default Index;
