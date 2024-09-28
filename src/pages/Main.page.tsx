import styled from '@emotion/styled';
import { useState } from 'react';

import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import Sidebar from '@/components/Sidebar';
import { useModalStore } from '@/store/useModalStore';
import CreateMemo from '@/components/modal/CustomModal';

const Main = () => {
  const { showModal } = useModalStore();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 모달을 띄우기 위한 버튼
  const openModal = () => {
    showModal('create-memo');
  };
  
  return (
    <>
      <SidebarContainer>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      </SidebarContainer>
      <MainContainer isSidebarOpen={isSidebarOpen}>
          <StyledButton onClick={openModal}>Open Modal</StyledButton>
        <SVGSideMenuContainer isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
          <SVGSidebarClosed style={{ width: '25px', height: '25px', transform: 'scale(-1, 1)', cursor: 'pointer' }} />
        </SVGSideMenuContainer>
        <Content></Content>
              {/* // create memo modal */}
      <CreateMemo modalId="create-memo" />
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


const StyledButton = styled.button`
  position: absolute;
  bottom: 20px;
  height: 40px;
  cursor: pointer;
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
