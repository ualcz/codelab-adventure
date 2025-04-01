
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAvatar } from '@/hooks/use-avatar';
import GameHeader from '@/components/shared/GameHeader';
import Footer from '@/components/shared/footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AvatarCard from '@/components/profile/AvatarCard';
import UserInfoCard from '@/components/profile/UserInfoCard';
import ProfileForm from '@/components/profile/ProfileForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserData, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Use the avatar hook
  const { 
    getAvatarUrl, 
    generateRandomSeed, 
    changeAvatarStyle,
    isUpdating,
    setIsUpdating,
    avatarSeed,
    currentAvatarStyle
  } = useAvatar(user);
  
  // Check authentication status and redirect if needed
  useEffect(() => {
    // Only redirect after the auth loading is complete and user is null
    if (!authLoading && user === null) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  
  // Save avatar changes when style or seed changes
  const saveAvatarChanges = async () => {
    try {
      setIsUpdating(true);
      
      // Get current avatar URL or generate one with new parameters
      const avatarUrl = getAvatarUrl();

      console.log("Saving avatar URL:", avatarUrl);
      
      // Update profile with new avatar URL
      const updatedUser = await updateUserProfile({
        username: user?.username || '',
        email: user?.email || '',
        avatarUrl: avatarUrl
      });
      
      // Update user data in auth context
      updateUserData({
        ...updatedUser,
        avatarUrl: avatarUrl
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Refs para armazenar valores anteriores do avatar para comparação
  const prevAvatarSeedRef = useRef(avatarSeed);
  const prevAvatarStyleRef = useRef(currentAvatarStyle);
  
  // Monitora mudanças no seed ou estilo do avatar e salva automaticamente
  useEffect(() => {
    // Não executar na primeira renderização ou quando o usuário for carregado
    if (user && !authLoading) {
      // Verificar se houve mudança real nos valores do avatar
      const seedChanged = prevAvatarSeedRef.current !== avatarSeed;
      const styleChanged = prevAvatarStyleRef.current !== currentAvatarStyle;
      
      // Só atualizar se houve mudança real e não estiver no meio de uma atualização
      if ((seedChanged || styleChanged) && !isUpdating) {
        // Atualizar refs com valores atuais
        prevAvatarSeedRef.current = avatarSeed;
        prevAvatarStyleRef.current = currentAvatarStyle;
        
        saveAvatarChanges();
      }
    }
  }, [avatarSeed, currentAvatarStyle, user, authLoading, isUpdating]);
  
  // Atualizar refs quando o componente montar
  useEffect(() => {
    if (avatarSeed) {
      prevAvatarSeedRef.current = avatarSeed;
    }
    if (currentAvatarStyle) {
      prevAvatarStyleRef.current = currentAvatarStyle;
    }
  }, []);
  
  // Update handlers para mudar o avatar
  const handleGenerateRandomSeed = () => {
    generateRandomSeed();
    // O useEffect acima irá detectar a mudança e chamar saveAvatarChanges
  };
  
  const handleChangeAvatarStyle = () => {
    changeAvatarStyle();
    // O useEffect acima irá detectar a mudança e chamar saveAvatarChanges
  };
  
  const onSubmit = async (data: { username: string; email?: string }) => {
    try {
      setIsLoading(true);
      
      // Update profile including the current avatar URL
      const avatarUrl = getAvatarUrl();
      const updatedUser = await updateUserProfile({
        username: data.username,
        email: data.email, // Include the email field
        avatarUrl: avatarUrl
      });
      
      // Update user data in auth context
      updateUserData({
        ...updatedUser,
        avatarUrl: avatarUrl
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-game-background to-game-surface text-white">
      <GameHeader currentTab="profile" onTabChange={handleTabChange} />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="glass-panel border-2 border-game-primary/20 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <ProfileHeader 
              handleLogout={handleLogout} 
              isDialogOpen={isDialogOpen} 
              setIsDialogOpen={setIsDialogOpen} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column - Avatar and user info */}
              <div className="space-y-6">
                <AvatarCard 
                  user={user} 
                  avatarUrl={getAvatarUrl()}
                  generateRandomSeed={handleGenerateRandomSeed} 
                  changeAvatarStyle={handleChangeAvatarStyle}
                  isLoading={isUpdating}
                />
                
                <UserInfoCard user={user} />
              </div>
              
              {/* Right column - form and notifications */}
              <div className="md:col-span-2 space-y-6">
                <ProfileForm 
                  user={user} 
                  isLoading={isLoading} 
                  onSubmit={onSubmit} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
