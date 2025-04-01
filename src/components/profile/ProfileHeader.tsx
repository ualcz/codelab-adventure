
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Cpu, AlertTriangle } from 'lucide-react';
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

interface ProfileHeaderProps {
  handleLogout: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  handleLogout, 
  isDialogOpen, 
  setIsDialogOpen 
}) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-game-primary to-game-tertiary flex items-center justify-center shadow-lg shadow-game-primary/30">
        <Cpu className="h-8 w-8 text-white" />
      </div>
      
      <div>
        <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
        <p className="text-white/70">Gerencie suas informações pessoais</p>
      </div>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="ml-auto flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-game-surface border-game-warning">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-game-warning" />
              Confirmar logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Tem certeza que deseja sair da sua conta?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-game-background text-white hover:bg-game-background/70">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Sim, sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileHeader;
