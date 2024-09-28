import axios from 'axios';
const apiUrl = import.meta.env.VITE_API;
console.log('API URL:', apiUrl);

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
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
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
    if (error.response) {
      const status = error.response.status;

      // Unauthorized
      if (status === 401) {
        console.warn('Unauthorized, logging out...');
        useUserStore.getState().logout();
      }
      // Server error
      else if (status >= 500) {
        console.warn('Server error occurred:', error.response.data);
        useUserStore.getState().logout();
      }
      // Other errors
      else {
        console.error('Error response:', error.response.data);
        useUserStore.getState().logout();
      }
    }
    console.log(Response);
    return await Promise.reject(error);
  }
);

export default apiClient;
