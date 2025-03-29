
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/services/api';
import { Cpu, Save, LogOut, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';
import GameHeader from '@/components/shared/GameHeader';
import Footer from '@/components/shared/footer';

const profileSchema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Initialize form unconditionally but with empty default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });
  
  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
      });
    } else {
      // Redirect if not logged in
      navigate('/login');
    }
  }, [user, form, navigate]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUserProfile({
        username: data.username,
      });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'levels') {
      navigate('/levels');
    } else if (tab === 'learn') {
      navigate('/learn');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDialogOpen(false);
  };
  
  // If user is null, show a loading state instead of immediately redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="home" onTabChange={handleTabChange} />
      
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="glass-panel border-2 border-game-primary/20 p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
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
          
          <div className="space-y-6">
            <div className="p-4 bg-game-warning/10 border border-game-warning/20 rounded-lg text-white/90 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-game-warning" />
              <span>Seu progresso está sendo salvo na nuvem automaticamente.</span>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nome de usuário</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seunome" 
                          {...field} 
                          className="bg-game-background border-game-primary/20 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu@email.com" 
                          {...field} 
                          disabled
                          className="bg-game-background/50 border-game-primary/10 text-white/70 cursor-not-allowed"
                        />
                      </FormControl>
                      <p className="text-xs text-white/50">O email não pode ser alterado</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-game-primary to-game-tertiary hover:opacity-90 flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar alterações
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
