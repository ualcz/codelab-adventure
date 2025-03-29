
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  UserProgressSyncRequest,
  UserProgressSyncResponse,
  ProgressData,
} from '@/types/authTypes';

const API_URL = 'https://apicodelab.vercel.app';

// Helper function to handle responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  return response.json();
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
}

// Auth endpoints
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return handleResponse<LoginResponse>(response);
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return handleResponse<RegisterResponse>(response);
}

export async function refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return handleResponse<RefreshTokenResponse>(response);
}

// User endpoints
export async function getUserProfile(): Promise<User> {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  const data = await handleResponse<{success: boolean, user: User}>(response);
  return data.user;
}

export async function updateUserProfile(data: Partial<User>): Promise<User> {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleResponse<User>(response);
}

// Progress sync endpoints
export async function syncUserProgress(data: UserProgressSyncRequest): Promise<UserProgressSyncResponse> {
  const response = await fetch(`${API_URL}/user/progress`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleResponse<UserProgressSyncResponse>(response);
}

export const getUserProgress = async (): Promise<ProgressData> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token available');

  try {
    const response = await fetch(`${API_URL}/user/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      // Try to refresh the token
      await refreshToken({ refreshToken: localStorage.getItem('refreshToken') || '' });
      return getUserProgress(); // Recursive call after refreshing
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};
