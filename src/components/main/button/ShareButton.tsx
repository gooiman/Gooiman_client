import ShareIcon from '@/assets/ShareIcon.svg?react';
import styled from '@emotion/styled';

interface Props {
  pageId: string | null;
}

const ShareButton = ({ pageId }: Props) => {
  const handleShare = () => {
    const baseUrl = window.location.origin;
    const inviteLink = `${baseUrl}/${pageId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        alert('초대 링크가 복사되었습니다!');
      })
      .catch((err) => {
        console.error('초대 링크 복사에 실패했습니다:', err);
      });
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
