import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/shared/GameHeader';
import Footer from '@/components/shared/footer';
import LearnTab from '@/components/Lean/LearnTab';

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
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="learn" onTabChange={handleTabChange} />
      
      <div className="py-4">
        <LearnTab onNavigate={handleTabChange} />
      </div>

      <Footer />
    </div>
  );
};

export default LearnPage;
