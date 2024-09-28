import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface MemoData {
  page_id: string | null;
  author: string | null;
  title: string;
  category: string;
  sub_category: string;
  content: string;
  color: string;
}

const updateMemo = async (memoData: MemoData) => {
  const { data } = await apiClient.put(API_ENDPOINTS.MEMO.MEMOS, memoData);
  return data;
};

export const useCreateMemo = () => {
  return useMutation({
    mutationFn: (memoData: MemoData) => updateMemo(memoData),
  });
};

const getMemoList = async (pageId: string, category: string) => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.MEMO.MEMO_CATEGORIES.replace(':pageId', pageId).replace(':category', category)
  );
  return data.data;
};

export const useMemoList = (pageId: string, category: string) => {
  return useQuery({
    queryKey: ['pageInfo', pageId, category],
    queryFn: () => getMemoList(pageId, category),
    enabled: !!pageId && !!category,
  });
};
