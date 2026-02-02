import axios from 'axios';
import { api, publicApi } from './api';
import { AuthCredentials, User } from '@/types';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  expiresInMins?: number;
}

export const loginUser = async (credentials: AuthCredentials): Promise<User> => {
  try {
    const response = await publicApi.post<LoginResponse>('/auth/login', credentials);
    
    const data = response.data;
    
    if (data.accessToken) {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      
      const expiresInMs = (data.expiresInMins || 60) * 60 * 1000;
      const expirationTime = new Date().getTime() + expiresInMs;
      localStorage.setItem('token_expires', expirationTime.toString());
    }
    
    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
      token: data.accessToken,
    };
    
    return user;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      const status = error.response?.status;
      
      if (status === 400) {
        throw new Error('Invalid username or password');
      } else if (status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error(errorMessage);
      }
    }
    throw new Error('Network error occurred');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await api.get('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data;
    
    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
      token: token,
    };
    
    return user;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
    throw new Error('Network error occurred');
  }
};

export const refreshToken = async (): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    
    const response = await publicApi.post('/auth/refresh', {
      refreshToken,
      expiresInMins: 30
    });
    
    const data = response.data;
    
    if (data.accessToken) {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      
      const expiresInMs = (data.expiresInMins || 60) * 60 * 1000;
      const expirationTime = new Date().getTime() + expiresInMs;
      localStorage.setItem('token_expires', expirationTime.toString());
    }
    
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };
    
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires');
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to refresh token');
    }
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token_expires');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  const expires = localStorage.getItem('token_expires');
  
  if (!token || !expires) return false;
  
  const expirationTime = parseInt(expires);
  const currentTime = new Date().getTime();
  
  return currentTime < (expirationTime - 5 * 60 * 1000);
};