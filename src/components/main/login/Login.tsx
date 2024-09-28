import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLogin } from '@/api/hooks/useUser';
import { useUserStore } from '@/store/useUserStore';
import Logo from '@/assets/GooimanLogo.svg?react';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import ShareButton from '../button/ShareButton';
import MakeCloudButton from '../button/MakeCloudButton';
import MakePageButton from '../button/MakePageButton';
import BlueCloud from '@/assets/BlueCloud.svg';
import { useModalStore } from '@/store/useModalStore';
import CreateMemo from '@/components/modal/CustomModal';

interface Props {
  pageId: string | null;
  setPageId: (pageId: string) => void;
}

const Login = ({ setPageId, pageId }: Props) => {
  const { showModal } = useModalStore();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isAuthenticated, login } = useUserStore();
  const loginMutation = useLogin();

  const openModal = () => {
    showModal('create-memo');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    if (authToken && userName) {
      setIsLoggedIn(true); // 로컬스토리지에 토큰이 있으면 로그인 상태로 설정
      setName(userName); // 로컬스토리지에서 이름 불러오기
    }
  }, []);

  const handleLogin = () => {
    if (!pageId) {
      console.warn('Page ID is missing.');
      return;
    }

    // 로그인 요청 보내기
    loginMutation.mutate(
      { pageId, name, password },
      {
        onSuccess: (data) => {
          if (data) {
            login(data.token, name); // zustand에 토큰과 이름 저장
            setIsLoggedIn(true); // 로그인 성공 시 UI 상태 변경
          }
        },
      }
    );
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
      {isAuthenticated || isLoggedIn ? ( // zustand의 상태 또는 localStorage에 따라 UI 변경
        <LoginComplete />
      ) : (
        <LoginContainer>
          <LoginInput text="name" value={name} type="text" font="BMHANNA" onChange={(e) => setName(e.target.value)} />
          <LoginInput text="pw" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          <LoginButton onClick={handleLogin} />
        </LoginContainer>
      )}
      <ButtonContainer>
        <MakePageButton setPageId={setPageId} />
        <StyledButton onClick={openModal}>
          <MakeCloudButton />
        </StyledButton>
        <ShareButton pageId={pageId} />
      </ButtonContainer>
      <CreateMemo modalId="create-memo" />
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

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
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
    color: var(--skyBlue1);
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
