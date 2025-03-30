
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Book, Trophy, Cpu, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ currentTab, onTabChange }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-gradient-to-r from-game-background via-game-surface to-game-background border-b-2 border-game-primary/20 py-6 px-4 flex justify-between items-center glass-panel animate-fade-in shadow-lg">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-game-primary to-game-tertiary flex items-center justify-center shadow-lg shadow-game-primary/30 animate-pulse-light">
          <Cpu className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-game-primary via-game-warning to-game-tertiary bg-clip-text text-transparent">
        CodeLab
        </h1>
      </div>
      
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="glass-panel border-2 border-white/10 bg-gradient-to-r from-game-panel/50 to-game-background/50">
          <TabsTrigger 
            value="home" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-game-primary/20 data-[state=active]:to-game-tertiary/20 data-[state=active]:border-b-2 data-[state=active]:border-game-primary text-white"
          >
            <Home className="h-4 w-4 mr-1 text-game-primary" />
            <span className="hidden md:inline">Início</span>
          </TabsTrigger>
          <TabsTrigger 
            value="levels" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-game-primary/20 data-[state=active]:to-game-tertiary/20 data-[state=active]:border-b-2 data-[state=active]:border-game-primary text-white"
          >
            <Trophy className="h-4 w-4 mr-1 text-game-warning" />
            <span className="hidden md:inline">Níveis</span>
          </TabsTrigger>
          <TabsTrigger 
            value="learn" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-game-primary/20 data-[state=active]:to-game-tertiary/20 data-[state=active]:border-b-2 data-[state=active]:border-game-primary text-white"
          >
            <Book className="h-4 w-4 mr-1 text-game-success" />
            <span className="hidden md:inline">Aprender</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="hidden md:flex items-center gap-2">
        {isAuthenticated ? (
          <Button 
            onClick={() => navigate('/profile')} 
            variant="outline" 
            className="text-white border-white/10 bg-game-surface/50 hover:bg-game-surface/70 flex items-center gap-2"
          >
            <User className="h-4 w-4 text-game-primary" />
            <span className="hidden md:inline">{user?.username}</span>
          </Button>
        ) : (
          <Button 
            onClick={() => navigate('/login')} 
            variant="outline"
            className="text-white border-white/10 bg-game-surface/50 hover:bg-game-surface/70 flex items-center gap-2"
          >
            <LogIn className="h-4 w-4 text-game-primary" />
            <span className="hidden md:inline">Entrar</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
