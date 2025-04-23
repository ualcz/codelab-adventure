
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

const API_URL = 'https://codlab-api.vercel.app/api/v1';

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
  const formData = new URLSearchParams();
  formData.append('username', data.email);
  formData.append('password', data.password);

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
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

export async function updateUserProfile(data: Partial<User>, retryCount = 0): Promise<User> {
  // Limit the number of retry attempts to prevent infinite recursion
  const MAX_RETRIES = 1;
  
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (response.status === 401 && retryCount < MAX_RETRIES) {
      // Try to refresh the token
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        try {
          const refreshResult = await refreshToken({ refreshToken: refreshTokenValue });
          // Only retry if we successfully got a new token and refresh token
          if (refreshResult && refreshResult.token && refreshResult.refreshToken) {
            // Store the new token and refresh token
            localStorage.setItem('token', refreshResult.token);
            localStorage.setItem('refreshToken', refreshResult.refreshToken);
            // Retry the request with the new token (increment retry counter)
            return updateUserProfile(data, retryCount + 1);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw new Error('Authentication failed. Please login again.');
        }
      }
    }
    
    const responseData = await handleResponse<{success: boolean, user: User}>(response);
    return responseData.user;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Progress sync endpoints
export async function syncUserProgress(data: UserProgressSyncRequest): Promise<UserProgressSyncResponse> {
  // Format data to match backend schema
  const formattedData = {
    completed_levels: data.completedLevels,
    last_saved: new Date().toISOString()
  };

  const response = await fetch(`${API_URL}/user/progress`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(formattedData),
  });
  
  return handleResponse<UserProgressSyncResponse>(response);
}

export const getUserProgress = async (retryCount = 0): Promise<ProgressData> => {
  // Limit the number of retry attempts to prevent infinite recursion
  const MAX_RETRIES = 1;
  
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token available');

  try {
    const response = await fetch(`${API_URL}/user/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401 && retryCount < MAX_RETRIES) {
      // Try to refresh the token
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        try {
          const refreshResult = await refreshToken({ refreshToken: refreshTokenValue });
          // Only retry if we successfully got a new token and refresh token
          if (refreshResult && refreshResult.token && refreshResult.refreshToken) {
            // Store the new token and refresh token
            localStorage.setItem('token', refreshResult.token);
            localStorage.setItem('refreshToken', refreshResult.refreshToken);
            // Retry the request with the new token (increment retry counter)
            return getUserProgress(retryCount + 1);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw new Error('Authentication failed. Please login again.');
        }
      }
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
