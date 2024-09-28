import styled from '@emotion/styled';
import { useState } from 'react';
import Logo from '@/assets/GooimanLogo.svg?react';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import ShareButton from '../button/ShareButton';
import MakeCloudButton from '../button/MakeCloudButton';
import MakePageButton from '../button/MakePageButton';
import BlueCloud from '@/assets/BlueCloud.svg';

interface Props {
  pageId: string | null;
  setPageId: (pageId: string) => void; // 페이지 ID를 설정할 함수
}

const Login = ({ setPageId, pageId }: Props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    //로그인 로직
    setIsLoggedIn(true);
  };

  const LoginComplete = () => {
    return (
      <LoginCompleteContainer>
        <Auth>
          <span>{name}</span>님<br />
          구름을 만들어주세요!
        </Auth>
      </LoginCompleteContainer>
    );
  };

  return (
    <Container>
      <BlueCloudIcon src={BlueCloud} alt="icon" />
      <BigBlueCloudIcon src={BlueCloud} alt="icon" />
      <Logo style={{ width: '100%' }} />
      {isLoggedIn ? (
        <LoginComplete />
      ) : (
        <LoginContainer>
          <LoginInput text="name" value={name} onChange={(e) => setName(e.target.value)} />
          <LoginInput text="pw" value={password} onChange={(e) => setPassword(e.target.value)} />
          <LoginButton onClick={handleLogin} />
        </LoginContainer>
      )}
      <ButtonContainer>
        <MakePageButton setPageId={setPageId} />
        <MakeCloudButton />
        <ShareButton />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  max-width: 30rem;
  min-width: 12rem;
  margin-left: auto;
  right: 0px;
  top: 0;
  margin: 30px;
  position: absolute;
`;

const LoginContainer = styled.div`
  padding: 20px;
  background-color: var(--skyBlue3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 0px 5px 0px var(--skyBlue2);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 20px;
`;

const LoginCompleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--skyBlue3);
  gap: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px var(--skyBlue2);
  border-radius: 10px;
  box-sizing: border-box;
`;

const Auth = styled.p`
  margin: 0;
  font-family: 'BMHANNA', sans-serif;
  color: var(--gray8);
  font-size: 20px;
  span {
    color: var(--skyBlue1); /* 원하는 색상으로 변경 */
  }
`;

const BlueCloudIcon = styled.img`
  width: 80px;
  position: absolute;
  top: 40px;
  left: -30px;
`;
const BigBlueCloudIcon = styled.img`
  width: 100px;
  position: absolute;
  top: -10px;
  left: -90px;
`;

export default Login;
