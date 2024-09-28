import { usePages } from '@/api/hooks/usePages';

const DetailMemo = () => {
  // usePages 훅을 사용해 데이터를 가져옴
  const { data, isLoading, error } = usePages();
  console.log(data);

  // 로딩 중일 때 화면에 로딩 메시지 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때 에러 메시지 표시
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div>
      <h1>Detail Memo Page</h1>
      <div>
        <h2>Genres</h2>
        
      </div>
    </div>
  );
};

export default DetailMemo;
