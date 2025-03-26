
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/Header/GameHeader';
import HomeTab from '@/components/home/HomeTab';

const Index = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === 'levels') {
      navigate('/levels');
    } else if (tab === 'learn') {
      navigate('/learn');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="home" onTabChange={handleTabChange} />
      <div className="py-4">
        <HomeTab onNavigate={handleTabChange} />
      </div>
    </div>
  );
};

export default Index;
