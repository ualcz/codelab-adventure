
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Book, 
  Terminal, 
  ChevronUp, 
  Cpu,
} from 'lucide-react';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white animate-fade-in">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-16 max-w-3xl">
          <div className="animate-float mb-6">
            <Cpu className="h-16 w-16 mx-auto text-game-warning" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-game-primary via-game-warning to-game-tertiary bg-clip-text text-transparent">
          CodeLab
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="game-btn game-btn-primary text-lg px-8 py-6 font-bold bg-gradient-to-r from-game-primary to-game-tertiary hover:opacity-90"
              onClick={() => onNavigate('levels')}
            >
              <Trophy className="h-5 w-5 mr-2" />
              Iniciar Aventura
            </Button>
            <Button 
              className="game-btn game-btn-primary text-white hover:blue/10 text-lg px-8 py-6 font-bold"
              onClick={() => onNavigate('learn')}
            >
              <Book className="h-5 w-5 mr-2" />
              Aprender Conceitos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all duration-300 border-2 border-game-primary/20 shadow-lg shadow-game-primary/10" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4 p-3 bg-game-primary/20 rounded-full w-14 h-14 flex items-center justify-center">
              <Terminal className="h-7 w-7 text-game-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Programação Visual</h3>
            <p className="text-white/70">
              Arraste e solte blocos de código para criar suas soluções, sem precisar digitar nenhuma linha de código.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all duration-300 border-2 border-game-warning/20 shadow-lg shadow-game-warning/10" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4 p-3 bg-game-warning/20 rounded-full w-14 h-14 flex items-center justify-center">
              <ChevronUp className="h-7 w-7 text-game-warning" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progressão Gradual</h3>
            <p className="text-white/70">
              Comece com conceitos simples e avance para desafios mais complexos envolvendo loops.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all duration-300 border-2 border-game-tertiary/20 shadow-lg shadow-game-tertiary/10" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 p-3 bg-game-tertiary/20 rounded-full w-14 h-14 flex items-center justify-center">
              <Trophy className="h-7 w-7 text-game-tertiary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desafios Divertidos</h3>
            <p className="text-white/70">
              Colete itens, desvie de obstáculos e resolva labirintos enquanto aprende lógica computacional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
