
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, AuthCredentials } from '@/types';
import { loginUser, getCurrentUser, logout as apiLogout, isAuthenticated, refreshToken } from '@/services/authService';

const initializeUser = async (): Promise<User | null> => {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    return await getCurrentUser();
  } catch (error) {
    console.error('Failed to initialize user:', error);
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      
      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginUser(credentials);
          set({ user, isLoading: false, error: null });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        apiLogout();
        set({ user: null, error: null });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      initialize: async () => {
        set({ isLoading: true });
        try {
          const user = await initializeUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({ user: null, isLoading: false });
        }
      },
      
      refreshUserToken: async () => {
        try {
          const tokens = await refreshToken();
          
          const user = await getCurrentUser();
          set({ user });
          
          return tokens.accessToken;
        } catch (error) {
          get().logout();
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user 
      })
    }
  )
);