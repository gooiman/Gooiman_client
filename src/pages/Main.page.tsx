import Styled from '@emotion/styled';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Login from '@/components/main/login/Login';
import CloudArea from '@/components/main/CloudArea';

const Main = () => {
  const [pageId, setPageId] = useState<string | null>(null);
  return (
    <MainContainer>
      <Sidebar />
      <CloudArea pageId={pageId} />
      <Login setPageId={setPageId} pageId={pageId} />
    </MainContainer>
  );
};

const MainContainer = Styled.div`
  display: flex;
  background-color: var(--skyBlue2);
  height: 100vh;
`;

export default Main;
