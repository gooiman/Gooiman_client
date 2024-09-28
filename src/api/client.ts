import axios from 'axios';
import { getToken } from '@/utils/auth-utils';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

import { useUserStore } from '@/store/useUserStore';

const getToken = () => {
  const { token } = useUserStore.getState();
  return token;
};

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken(); // 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 헤더에 추가
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized, logging out...');
      useAppStore.getState().logout(); // 401 에러 발생 시 로그아웃 처리
    }
    return await Promise.reject(error);
  }
);

export default apiClient;
