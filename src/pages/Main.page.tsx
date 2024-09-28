import Styled from '@emotion/styled';

import Sidebar from '@/components/Sidebar';

const Main = () => {
  return (
    <MainContainer>
      <Sidebar />
      MainPage
    </MainContainer>
  );
};

const MainContainer = Styled.div`
  display: flex;
`;

export default Main;
