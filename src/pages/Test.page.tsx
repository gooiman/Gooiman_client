import { usePageInfo } from '@/api/hooks/usePages';
import { useUserStore } from '@/store/useUserStore';

const Test = () => {
  // zustand 스토어에서 pageId 가져오기
  const pageId = useUserStore((state) => state.pageId);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  console.log("🚀 ~ file: Test.page.tsx:8 ~ Test ~ isAuthenticated:", isAuthenticated)
  console.log('🚀 ~ file: Test.page.tsx:7 ~ Test ~ pageId:', pageId);

  // usePageInfo 훅을 사용해 데이터를 가져옴
  const { data, isLoading, isError } = usePageInfo(pageId || '', isAuthenticated);

  console.log('🚀 ~ file: Test.page.tsx:10 ~ Test ~ data:', data);

  if (!data || isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (isError) {
    return <div>Error loading page data</div>; // 에러 발생 시 표시
  }
  if (!pageId) {
    return <div>Page ID is missing</div>;
  }

  return (
    <div>
      <h1>Page Info</h1>
      {/* 페이지 정보 표시 */}
      <p>Page ID: {pageId}</p>
      <p>Page Data ID: {data.data.id}</p>
    </div>
  );
};

export default Test;
