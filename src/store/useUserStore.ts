import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token) => {
        try {
          localStorage.setItem('authToken', JSON.stringify(token));
          set({ isAuthenticated: true, token });
        } catch (error) {
          console.warn('Failed to save the token:', error);
        }
      },
      logout: () => {
        try {
          localStorage.removeItem('authToken');
          set({ isAuthenticated: false, token: null });
        } catch (error) {
          console.warn('Failed to remove the token:', error);
        }
      },
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

// This function initializes the app by checking if there's a token in localStorage
const initializeApp = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    useUserStore.getState().login(JSON.parse(token)); // JSON 파싱 후 토큰 설정
  } else {
    useUserStore.getState().logout();
  }
};

// Call the initialize function on app load
initializeApp();
