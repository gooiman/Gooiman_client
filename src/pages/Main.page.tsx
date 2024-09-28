import Styled from '@emotion/styled';

import Sidebar from '@/components/Sidebar';
import Login from '@/components/main/login/Login';

const Main = () => {
  return (
    <MainContainer>
      <Sidebar />
      <Login />
    </MainContainer>
  );
};

const MainContainer = Styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.skyBlue2};
  height: 100vh;
`;

export default Main;
