import styled from '@emotion/styled';

interface Props {
  pageId: string | null;
}

const CloudArea = ({ pageId }: Props) => {
  return <Container>{pageId ? <>새 페이지 생성 완료</> : <>페이지가 없습니다</>}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 40px;
  color: var(--skyBlue1);
  justify-content: center;
  height: 100%;
`;
export default CloudArea;
