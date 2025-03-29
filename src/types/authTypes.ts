
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface UserProgressSyncRequest {
  completedLevels: number[];
  lastSaved: string;
}

export interface UserProgressSyncResponse {
  success: boolean;
  message: string;
  completedLevels: number[];
}

// Definindo os tipos de dados
export interface Level {
  id: number;
  completed: boolean;
  unlocked: boolean;
}

export interface ProgressData {
  completedLevels: number[];
  lastSaved: string; // ISO date string
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}