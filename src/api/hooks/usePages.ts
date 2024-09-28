import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { useQuery } from '@tanstack/react-query';

// 페이지 정보를 가져오는 API 호출 함수
const getPageInfo = async (pageId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.PAGE.GET_PAGE.replace(':pageId', pageId));
  return data.data;
};

// React Query의 useQuery 훅을 이용해 데이터를 가져옴
export const usePageInfo = (pageId: string) => {
  return useQuery({
    queryKey: ['pageInfo', pageId], 
    queryFn: () => getPageInfo(pageId), 
    enabled: !!pageId, 
  });
};
