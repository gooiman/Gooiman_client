import MakeCloudIcon from '@/assets/MakeCloudIcon.svg?react';
import styled from '@emotion/styled';

const MakeCloudButton = () => {
  return (
    <Container>
      <MakeCloudIcon style={{ width: '100%' }} />
      <ButtonText>Make{'\n'}Cloud</ButtonText>
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

export default MakeCloudButton;
