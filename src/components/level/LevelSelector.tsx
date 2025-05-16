
import React, { useState, useEffect } from 'react';
import { Level, getLevels } from '@/data/level/levelManager';
import { CheckSquare, Lock, BotIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LevelSelectorProps {
  onSelectLevel: (level: Level) => void;
  currentLevelId?: number;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel, currentLevelId }) => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const saveActiveModule = (module: string) => {
    localStorage.setItem('activeModule', module);
  };
  
  const getActiveModuleFromStorage = (): string | null => {
    return localStorage.getItem('activeModule');
  };
  
  useEffect(() => {
    const updateLevels = () => {
      const currentLevels = getLevels();
      setLevels([...currentLevels]); 
      
      const savedModule = getActiveModuleFromStorage();
      const modules = [...new Set(currentLevels.map(level => level.module))];
      
      if (savedModule && modules.includes(savedModule)) {
        setActiveModule(savedModule);
      }
     
      else if (!activeModule && modules.length > 0) {
        setActiveModule(modules[0]);
      }
    };
    
    updateLevels();
    
    window.addEventListener('storage', updateLevels);
    
    return () => window.removeEventListener('storage', updateLevels);
  }, [activeModule]);
  
  const renderDifficultyStars = (difficulty: string) => {
    let stars = 1;
    if (difficulty === 'intermediate') stars = 2;
    if (difficulty === 'advanced') stars = 3;
    if (difficulty === 'expert') stars = 4;
    if (difficulty === 'master') stars = 5;
    
    const maxStars = 5; 
    
    return (
      <div className="flex">
        {[...Array(stars)].map((_, i) => (
          <BotIcon key={i} className="h-4 w-4 text-game-warning fill-game-warning" />
        ))}
        {[...Array(Math.max(0, maxStars - stars))].map((_, i) => (
          <BotIcon key={i + stars} className="h-4 w-4 text-white/20" />
        ))}
      </div>
    );
  };
  
  const modules = [...new Set(levels.map(level => level.module))];
  
  const filteredLevels = levels.filter(level => level.module === activeModule);
  
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {modules.map((module) => (
          <button
            key={module}
            className={`px-4 py-2 rounded-md transition-colors ${activeModule === module 
              ? 'bg-game-primary text-white' 
              : 'bg-game-background-light text-white/70 hover:bg-game-background-lighter'}`}
            onClick={() => {
              setActiveModule(module);
              saveActiveModule(module);
            }}
          >
            {module}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevels.map((level) => (
          <div 
            key={level.id}
            className={`level-card ${level.completed ? 'level-complete' : ''} ${!level.unlocked ? 'level-locked' : ''}`}
            onClick={() => {
              if (level.unlocked) {
                onSelectLevel(level);
              }
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white/90 flex items-center">
                <span className="inline-flex items-center justify-center bg-game-primary/20 text-game-primary rounded-full w-6 h-6 mr-2 text-sm font-bold">
                  {level.id}
                </span>
                {level.name}
                {level.completed && <CheckSquare className="h-4 w-4 inline ml-2 text-game-success" />}
              </h3>
              {renderDifficultyStars(level.difficulty)}
            </div>
            
            <p className="text-white/60 text-sm mb-4">{level.description}</p>
            
            <div className="flex flex-wrap gap-1">
              {level.concepts.map((concept, index) => (
                <Badge key={index} variant="outline" className="bg-game-tertiary/10 text-white/80 border-game-tertiary/30 text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
            
            {!level.unlocked && (
              <div className="absolute inset-0 rounded-md bg-game-background/80 backdrop-blur-sm flex items-center justify-center">
                <Lock className="h-8 w-8 text-white/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
