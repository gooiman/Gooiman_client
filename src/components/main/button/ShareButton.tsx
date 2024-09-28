import ShareIcon from '@/assets/ShareIcon.svg?react';
import styled from '@emotion/styled';

interface Props {
  pageId: string | null;
}

const ShareButton = ({ pageId }: Props) => {
  const handleShare = () => {
    // 링크 공유 로직
  };

  return (
    <Container onClick={handleShare}>
      <ShareIcon style={{ width: '100%' }} />
      <ButtonText>Share</ButtonText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  cursor: pointer;
`;

const ButtonText = styled.p`
  font-size: 11px;
  font-family: 'PressStart2P', sans-serif;
  color: var(--skyBlue1);
  margin: 0px;
`;

export default ShareButton;
