import MakePageIcon from '@/assets/MakeCloudIcon.svg?react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  setPageId: (pageId: string) => void; // 생성된 페이지 ID를 부모에게 전달할 수 있는 함수
}

const MakePageButton: React.FC<Props> = ({ setPageId }) => {
  const handleMakePage = () => {
    const newPageId = uuidv4(); // UUID를 사용해 새로운 페이지 ID 생성
    setPageId(newPageId); // 페이지 ID를 부모 컴포넌트로 전달
  };

  return (
    <Container onClick={handleMakePage}>
      <MakePageIcon style={{ width: '100%' }} />
      <ButtonText>Make{'\n'}Page</ButtonText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  cursor: pointer;
`;

const ButtonText = styled.p`
  font-size: 11px;
  font-family: 'PressStart2P', sans-serif;
  color: var(--skyBlue1);
  margin: 0px;
  text-align: center;
  white-space: pre-wrap;
`;

export default MakePageButton;
