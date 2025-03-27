
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/shared/GameHeader';
import LevelsTab from '@/components/level/LevelsTab';
import { Level } from '@/types/levelTypes';
import Footer from '@/components/shared/footer';

const LevelsPage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'learn') {
      navigate('/learn');
    } else if (tab === 'playground') {
      navigate('/level/1');
    }
  };

  const handleSelectLevel = (level: Level) => {
    navigate(`/level/${level.id}`);
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

      <Footer />
    </div>
  );
};

export default LevelsPage;
