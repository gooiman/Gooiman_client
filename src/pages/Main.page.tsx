import styled from '@emotion/styled';
import { useState } from 'react';

import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import Sidebar from '@/components/Sidebar';

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <SidebarContainer>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      </SidebarContainer>
      <MainContainer isSidebarOpen={isSidebarOpen}>
        <SVGSideMenuContainer isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
          <SVGSidebarClosed style={{ width: '25px', height: '25px', transform: 'scale(-1, 1)', cursor: 'pointer' }} />
        </SVGSideMenuContainer>
        <Content></Content>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  padding: 20px;
  margin-left: ${(props) => (props.isSidebarOpen ? '190px' : '0')};
  transition: margin-left 0.3s ease;
`;

const SVGSideMenuContainer = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  position: absolute;
  opacity: ${(props) => (props.isSidebarOpen ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div``;

const Content = styled.div``;

export default Main;
