
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/services/api';
import { Cpu, Save, LogOut, AlertTriangle, UserRound, RefreshCw, Copy } from 'lucide-react';
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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import GameHeader from '@/components/shared/GameHeader';
import Footer from '@/components/shared/footer';

const profileSchema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// List of possible avatar styles for generation
const AVATAR_STYLES = [
  "pixel-art",
  "micah",
  "adventurer",
  "adventurer-neutral",
  "big-ears",
  "big-smile",
  "bottts",
  "croodles",
  "identicon",
  "initials",
  "lorelei"
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserData, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAvatarStyle, setCurrentAvatarStyle] = useState("pixel-art");
  const [avatarSeed, setAvatarSeed] = useState("");
  const { toast } = useToast();
  
  // Initialize form unconditionally but with empty default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });
  
  // Update form values and avatar seed when user data is available
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
      });
      
      // Set avatar seed based on username or extract seed from existing avatarUrl
      if (user.avatarUrl && user.avatarUrl.includes('seed=')) {
        // Extract just the seed parameter from the URL to prevent nesting
        const seedMatch = user.avatarUrl.match(/seed=([^&]+)/);
        setAvatarSeed(seedMatch ? seedMatch[1] : user.username);
      } else {
        setAvatarSeed(user.username);
      }
    }
  }, [user, form]);
  
  // Check authentication status and redirect if needed
  useEffect(() => {
    // Only redirect after the auth loading is complete and user is null
    if (!authLoading && user === null) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  
  const generateRandomSeed = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setAvatarSeed(randomString);
  };

  const changeAvatarStyle = () => {
    const currentIndex = AVATAR_STYLES.indexOf(currentAvatarStyle);
    const nextIndex = (currentIndex + 1) % AVATAR_STYLES.length;
    setCurrentAvatarStyle(AVATAR_STYLES[nextIndex]);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "ID copiado para a área de transferência",
      variant: "default",
    });
  };
  
  const getAvatarUrl = () => {
    // Ensure the seed doesn't contain any URLs to prevent nesting
    let cleanSeed = avatarSeed;
    if (cleanSeed.includes('http')) {
      // If seed contains a URL, use only the username to prevent nesting
      cleanSeed = user?.username || 'user';
    }
    
    // Generate the avatar URL base
    const baseUrl = `https://api.dicebear.com/7.x/${currentAvatarStyle}/svg?seed=`;
    
    // Calculate maximum allowed seed length to stay under 255 characters
    const maxSeedLength = 250 - baseUrl.length;
    
    // Truncate the seed if necessary
    const truncatedSeed = cleanSeed.substring(0, maxSeedLength);
    
    // Return the final URL
    return `${baseUrl}${truncatedSeed}`;
  };
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      
      // Update profile including the new avatar URL
      const avatarUrl = getAvatarUrl();
      const updatedUser = await updateUserProfile({
        username: data.username,
        email: data.email, // Include the email field
        avatarUrl: avatarUrl
      });
      
      // Atualiza os dados do usuário no contexto de autenticação
      // Certifique-se de que o avatarUrl está incluído na atualização
      updateUserData({
        ...updatedUser,
        avatarUrl: avatarUrl // Garante que o novo avatarUrl seja usado imediatamente
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
  
  // Format date to a friendly format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // If auth is still loading, show a loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-game-primary mb-4"></div>
          <p>Carregando seu perfil...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="home" onTabChange={handleTabChange} />
      
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="glass-panel border-2 border-game-primary/20 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Avatar and user info */}
            <div className="space-y-6">
              <Card className="bg-game-surface/70 border-game-primary/20">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="mb-4 relative group">
                    <Avatar className="w-32 h-32 border-4 border-game-primary/30">
                      <AvatarImage src={getAvatarUrl()} alt="Avatar do usuário" />
                      <AvatarFallback className="bg-game-primary/20 text-xl">
                        <UserRound className="h-12 w-12 text-game-primary" />
                      </AvatarFallback>
                    </Avatar>
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
                      >
                        <RefreshCw className="h-4 w-4 mr-1" /> 
                        Novo avatar
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-game-background/50 border-game-primary/30 hover:bg-game-primary/20"
                        onClick={changeAvatarStyle}
                      >
                        Estilo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
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
            </div>
            
            {/* Right column - form and notifications */}
            <div className="md:col-span-2 space-y-6">
              
              <Card className="bg-game-surface/70 border-game-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Editar perfil</h3>
                  
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
