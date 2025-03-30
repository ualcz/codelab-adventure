import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/shared/GameHeader';
import Footer from '@/components/shared/footer';
import { Lightbulb, Zap, ChevronUp, Target,} from 'lucide-react';


const LearnPage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'levels') {
      navigate('/levels');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="learn" onTabChange={handleTabChange} />

      <div className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-game-warning" />
            Aprenda Programação
          </h2>
        </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all border border-game-primary/30 bg-gradient-to-br from-game-panel to-game-surface" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-game-primary/20 flex items-center justify-center mr-2">
                    <Zap className="h-4 w-4 text-game-primary" />
                  </div>
                  Movimento Básico
                </h3>
              </div>
              
              <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all border border-game-warning/30 bg-gradient-to-br from-game-panel to-game-surface" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-game-warning/20 flex items-center justify-center mr-2">
                    <ChevronUp className="h-4 w-4 text-game-warning" />
                  </div>
                  Loops (Repetições)
                </h3>
              </div>
      
      
              <div className="glass-panel p-6 rounded-lg animate-fade-in hover:scale-105 transition-all border border-game-tertiary/30 bg-gradient-to-br from-game-panel to-game-surface" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-game-tertiary/20 flex items-center justify-center mr-2">
                    <Target className="h-4 w-4 text-game-tertiary" />
                  </div>
                  Algoritmos
                </h3>
              </div>
            </div>
          </div>
      <Footer />
    </div>
  );
};

export default LearnPage;
