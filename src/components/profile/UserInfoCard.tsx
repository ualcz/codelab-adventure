
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/authTypes';

interface UserInfoCardProps {
  user: User | null;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "ID copiado para a área de transferência",
      variant: "default",
    });
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };
  
  return (
    <Card className="bg-game-surface/70 border-game-primary/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-3">Informações da conta</h3>
        
        <div className="space-y-2 text-sm">                    
          <div className="flex justify-between items-center">
            <span className="text-white/70">ID</span>
            <div className="flex items-center gap-1">
              <span className="text-white/90 text-xs font-mono">
                {user?.id ? user.id.substring(0, 16) + '...' : '-'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-game-primary/20"
                onClick={() => user?.id && copyToClipboard(user.id)}
                disabled={!user?.id}
              >
                <Copy className="h-3 w-3 text-white/70" />
              </Button>
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex justify-between">
            <span className="text-white/70">Membro desde</span>
            <span className="text-white/90">
              {user?.createdAt ? formatDate(user.createdAt) : '-'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
