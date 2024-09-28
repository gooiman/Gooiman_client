import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import Sidebar from '@/components/Sidebar';
import { useModalStore } from '@/store/useModalStore';
import CreateMemo from '@/components/modal/CustomModal';
import Login from '@/components/main/login/Login';
import CloudArea from '@/components/main/CloudArea';

interface MemoSummary {
  [category: string]: {
    [subCategory: string]: string[];
  };
}

interface ApiResponse {
  success: boolean;
  data: {
    name: string;
    memoSummaries: MemoSummary;
  };
  error: null | string;
}

const Main = () => {
  const { showModal } = useModalStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 모달을 띄우기 위한 버튼
  const openModal = () => {
    showModal('create-memo');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/page/dbdfa00c-4292-48c2-92b4-97c643e6dd5a`);
        setData(response.data);
        console.log('Data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SidebarContainer>
        {data && data.data && data.data.memoSummaries && (
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} data={data.data.memoSummaries} />
        )}
      </SidebarContainer>
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
  margin: 0 auto;
`;

export default Main;
