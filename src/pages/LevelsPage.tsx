import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/Header/GameHeader';
import LevelsTab from '@/components/level/LevelsTab';
import { Level } from '@/types/levelTypes';

const LevelsPage = () => {
  const navigate = useNavigate();

  const handleSelectLevel = (level: Level) => {
    navigate(`/level/${level.id}`);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'learn') {
      navigate('/learn');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="levels" onTabChange={handleTabChange} />
      
      <div className="py-4">
        <LevelsTab 
          onSelectLevel={handleSelectLevel} 
          currentLevelId={undefined} 
          onNavigate={handleTabChange} 
        />
      </div>
    </div>
  );
};

export default LevelsPage;