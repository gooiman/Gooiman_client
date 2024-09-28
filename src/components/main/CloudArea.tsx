import styled from '@emotion/styled';

interface Props {
  pageId: string | null;
}

const CloudArea: React.FC<Props> = ({ pageId }) => {
  return <Container>{pageId ? <>새 페이지 생성 완료</> : <>페이지가 없습니다</>}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 40px;
  color: var(--skyBlue1);
`;
export default CloudArea;
