import { useMutation } from '@tanstack/react-query';
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
