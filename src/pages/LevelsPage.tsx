
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/shared/GameHeader';
import LevelsTab from '@/components/level/LevelsTab';
import { Level } from '@/types/levelTypes';
import Footer from '@/components/shared/footer';
import { clearProgress, loadProgress } from '@/data/level/progressManager';
import { useToast } from '@/hooks/use-toast';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Load progress when the component mounts
  useEffect(() => {
    const initializeLevels = async () => {
      try {
        await loadProgress();
      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeLevels();
    
    // Listen for storage events to update UI when progress changes
    const handleStorageChange = () => {
      loadProgress();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const handleResetProgress = () => {
    clearProgress();
    toast({
      title: "Progresso resetado",
      description: "Todo o seu progresso foi apagado com sucesso.",
      variant: "default",
    });
    // Force a reload of the page to update the UI
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="levels" onTabChange={handleTabChange} />
      
      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-game-primary"></div>
          </div>
        ) : (
          <LevelsTab 
            onSelectLevel={handleSelectLevel} 
            currentLevelId={undefined} 
            onNavigate={handleTabChange}
            onResetProgress={handleResetProgress}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LevelsPage;
