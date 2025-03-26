
import React, { useEffect, useState } from 'react';
import { BotIcon, Save } from 'lucide-react';
import LevelSelector from '@/components/level/LevelSelector';
import { getCompletedLevels } from '@/data/level/levelManager';
import { Level } from '@/types/levelTypes';

interface LevelsTabProps {
  onSelectLevel: (level: Level) => void;
  currentLevelId?: number;
  onNavigate: (tab: string) => void;
}

const LevelsTab: React.FC<LevelsTabProps> = ({ 
  onSelectLevel, 
  currentLevelId, 
  onNavigate 
}) => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
  // Function to update completed levels
  const updateCompletedLevels = () => {
    const levels = getCompletedLevels();
    setCompletedLevels(levels);
    console.log("Updated completed levels:", levels);
  };
  
  // Load completed levels from localStorage on mount
  useEffect(() => {
    updateCompletedLevels();
    
    // Listen for storage events from other tabs or custom events
    const handleStorageChange = () => {
      updateCompletedLevels();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BotIcon className="h-6 w-6 mr-2 text-game-warning" />
          Níveis de Desafio
        </h2>
        
        <div className="text-sm text-white/70 flex items-center">
          <Save className="h-4 w-4 mr-2 text-game-warning" />
          {completedLevels.length > 0 ? 
            `${completedLevels.length} níveis completados` : 
            'Nenhum nível completado ainda'}
        </div>
      </div>
      
      <LevelSelector 
        onSelectLevel={onSelectLevel}
        currentLevelId={currentLevelId}
      />
    </div>
  );
};

export default LevelsTab;
