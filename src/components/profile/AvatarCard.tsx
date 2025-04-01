
import React from 'react';
import { RefreshCw, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from '@/types/authTypes';

interface AvatarCardProps {
  user: User | null;
  avatarUrl: string;
  generateRandomSeed: () => void;
  changeAvatarStyle: () => void;
  isLoading?: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ 
  user, 
  avatarUrl,
  generateRandomSeed, 
  changeAvatarStyle,
  isLoading = false
}) => {
  return (
    <Card className="bg-game-surface/70 border-game-primary/20">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="mb-4 relative group">
          <Avatar className="w-32 h-32 border-4 border-game-primary/30">
            <AvatarImage src={avatarUrl} alt="Avatar do usuário" />
            <AvatarFallback className="bg-game-primary/20 text-xl">
              <UserRound className="h-12 w-12 text-game-primary" />
            </AvatarFallback>
          </Avatar>
          {isLoading && (
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-game-primary border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        
        <div className="space-y-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-center text-lg font-medium">{user?.username}</p>
            <p className="text-center text-sm text-white/60">{user?.email}</p>
          </div>
          
          <div className="flex gap-2 justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-game-background/50 border-game-primary/30 hover:bg-game-primary/20"
              onClick={generateRandomSeed}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-1" /> 
              Novo avatar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-game-background/50 border-game-primary/30 hover:bg-game-primary/20"
              onClick={changeAvatarStyle}
              disabled={isLoading}
            >
              Estilo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarCard;
