import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { useQuery } from '@tanstack/react-query';

const getPages = async (pageId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.PAGE.GET_PAGE.replace(':pageId', pageId));
  return data.data;
};

export const usePages = () => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: () => getPages('dbdfa00c-4292-48c2-92b4-97c643e6dd5a'),
  });
};
