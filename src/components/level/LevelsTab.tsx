
import React, { useEffect, useState } from 'react';
import { AlertTriangle, BotIcon, Trash } from 'lucide-react';
import LevelSelector from '@/components/level/LevelSelector';
import { getCompletedLevels } from '@/data/level/levelManager';
import { Level } from '@/types/levelTypes';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LevelsTabProps {
  onSelectLevel: (level: Level) => void;
  currentLevelId?: number;
  onNavigate: (tab: string) => void;
  onResetProgress?: () => void;
}

const LevelsTab: React.FC<LevelsTabProps> = ({ 
  onSelectLevel, 
  currentLevelId, 
  onNavigate,
  onResetProgress
}) => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  const handleResetProgress = () => {
    if (onResetProgress) {
      onResetProgress();
      setIsDialogOpen(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BotIcon className="h-6 w-6 mr-2 text-game-warning" />
          Níveis de Desafio
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/70 flex items-center">
            <BotIcon className="h-4 w-4 mr-2 text-game-warning" />
            {completedLevels.length > 0 ? 
              `${completedLevels.length} níveis completados` : 
              'Nenhum nível completado ainda'}
          </div>
          
          {onResetProgress && completedLevels.length > 0 && (
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash className="h-2 w-2" />
                  Limpar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-game-surface border-game-warning">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-game-warning" />
                    Resetar Progresso
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    Você tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-game-background text-white hover:bg-game-background/70">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleResetProgress}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Sim, resetar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
