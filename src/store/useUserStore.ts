import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  pageId: string | null;
  name: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
  setPageId: (pageId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      pageId: null,
      name: null,
      login: (token, name) => {
        try {
          localStorage.setItem('authToken', JSON.stringify(token));
          localStorage.setItem('userName', JSON.stringify(name));
          set({ isAuthenticated: true, token, name });
        } catch (error) {
          console.warn('Failed to save the token and name:', error);
        }
      },
      logout: () => {
        try {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userName');
          set({ isAuthenticated: false, token: null, pageId: null, name: null });
        } catch (error) {
          console.warn('Failed to remove the token and name:', error);
        }
      },
      setPageId: (pageId: string) => {
        try {
          localStorage.setItem('pageId', JSON.stringify(pageId));
          set({ pageId });
        } catch (error) {
          console.warn('Failed to save the pageId:', error);
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

// 초기화 함수
export const initializeApp = () => {
  const token = localStorage.getItem('authToken');
  const pageId = localStorage.getItem('pageId');
  const name = localStorage.getItem('userName');

  if (token && name) {
    useUserStore.getState().login(JSON.parse(token), JSON.parse(name)); // 토큰과 이름 저장
  } else {
    useUserStore.getState().logout();
  }

  if (pageId) {
    useUserStore.getState().setPageId(JSON.parse(pageId));
  }
};

// 앱 시작 시 초기화 함수 실행
initializeApp();
