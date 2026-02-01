import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, AuthCredentials } from '@/types';
import { loginUser } from '@/services/authService';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      
      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginUser(credentials);
          set({ user, isLoading: false, error: null });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, error: null });
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);