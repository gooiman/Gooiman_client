import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { useMutation } from '@tanstack/react-query';

// PUT 요청 함수
const updatePageInfo = async (name: string) => {
  const { data } = await apiClient.put(API_ENDPOINTS.AUTH.PUT_PAGE, { name });
  console.log('🚀 ~ file: useUser.ts:7 ~ updatePageInfo ~ data:', data);
  return data.data;
};

// useMutation 훅을 이용하여 PUT 요청 실행
export const useUpdatePages = () => {
  return useMutation({
    mutationFn: () => updatePageInfo('hello'), // 인자로 name을 받아서 요청 보냄
  });
};
// 로그인 API 요청 함수
const loginUser = async (pageId: string, name: string, password: string) => {
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN.replace(':pageId', pageId), {
    name,
    password,
  });
  console.log('🚀 ~ file: useUser.ts:7 ~ loginUser ~ data:', data.data);
  return data.data;
};

// useMutation 훅을 이용하여 로그인 요청 실행
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ pageId, name, password }: { pageId: string; name: string; password: string }) =>
      loginUser(pageId, name, password),
    onError: (error) => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    },
  });
};
