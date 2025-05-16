
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/authTypes';
import { login, register, refreshToken, getUserProfile } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  updateUserData: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const refreshTokenValue = localStorage.getItem('refreshToken');
      
      if (!token || !refreshTokenValue) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        try {
          const tokens = await refreshToken({ refreshToken: refreshTokenValue });
          localStorage.setItem('token', tokens.token);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          
          const userData = await getUserProfile();
          setUser(userData);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          const currentPath = window.location.pathname;
          if (currentPath !== '/login' && currentPath !== '/register') {
            handleLogout();
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    const interval = setInterval(checkAuth, 5 * 60 * 1000); 
    
    return () => clearInterval(interval);
  }, []);
  
  const handleLogin = async (data: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await login(data);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${response.user.username}!`,
        variant: "default",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (data: RegisterRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await register(data);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      
      toast({
        title: "Registro realizado com sucesso",
        description: `Bem-vindo ao CodeLab, ${response.user.username}!`,
        variant: "default",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Verifique os dados informados e tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
      variant: "default",
    });
  };
  
  const updateUserData = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
