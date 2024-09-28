import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import { useModalStore } from '@/store/useModalStore';
import CreateMemo from '@/components/modal/CustomModal';
import Login from '@/components/main/login/Login';
import CloudArea from '@/components/main/CloudArea';
import { useUpdatePages } from '@/api/hooks/useUser';
import { useUserStore } from '@/store/useUserStore';

const Main = () => {
  const { showModal } = useModalStore();
  const { pageId, setPageId } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { mutate: updatePage, data: pageInfo, isError } = useUpdatePages();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openModal = () => {
    showModal('create-memo');
  };

  useEffect(() => {
    if (!pageId) {
      updatePage();
    }
  }, [pageId, updatePage]);

  useEffect(() => {
    if (pageInfo && pageInfo.id) {
      setPageId(pageInfo.id);
    }
  }, [pageInfo, setPageId]);

  if (isError) {
    return <div>Error loading page</div>;
  }

  return (
    <>
      <SidebarContainer>{/* 사이드바 데이터가 있을 때 추가 */}</SidebarContainer>
      <MainContainer isSidebarOpen={isSidebarOpen}>
        <StyledButton onClick={openModal}>Open Modal</StyledButton>
        <SVGSideMenuContainer isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
          <SVGSidebarClosed style={{ width: '25px', height: '25px', transform: 'scale(-1, 1)', cursor: 'pointer' }} />
        </SVGSideMenuContainer>
        <Content>
          <CloudArea pageId={pageId} />
        </Content>
        <Login pageId={pageId} setPageId={setPageId} />
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
  height: 100vh;
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

const Content = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

export default Main;
