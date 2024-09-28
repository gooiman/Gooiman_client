import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import CreateMemo from '@/components/modal/CustomModal';
import Login from '@/components/main/login/Login';
import CloudArea from '@/components/main/CloudArea';
import { useUpdatePages } from '@/api/hooks/useUser';
import { useUserStore } from '@/store/useUserStore';
import { usePageInfo } from '@/api/hooks/usePages';
import { useParams } from 'react-router-dom';

const Main = () => {
  const { pageId, setPageId } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { pageId: paramPageId } = useParams<{ pageId: string }>();

  const { mutate: updatePage, data: pageInfo, isError } = useUpdatePages();
  const { data, isError: isPageError } = usePageInfo(pageId || '', isAuthenticated);
  console.log('🚀 ~ file: Main.page.tsx:21 ~ Main ~ data:', data);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (paramPageId) {
      setPageId(paramPageId);
    } else if (!pageId) {
      // paramPageId가 없고, pageId도 없으면 새로운 페이지를 생성
      updatePage();
    }
  }, [paramPageId, pageId, updatePage]);

  useEffect(() => {
    if (pageInfo && pageInfo.id) {
      setPageId(pageInfo.id);
    }
  }, [pageInfo, setPageId]);

  if (isError || isPageError) {
    return <div>Error loading page</div>;
  }

  return (
    <>
      <SidebarContainer>{/* 사이드바 데이터가 있을 때 추가 */}</SidebarContainer>
      <MainContainer isSidebarOpen={isSidebarOpen}>
        <SVGSideMenuContainer isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
          <SVGSidebarClosed style={{ width: '25px', height: '25px', transform: 'scale(-1, 1)', cursor: 'pointer' }} />
        </SVGSideMenuContainer>
        <Content>
          <CloudArea pageId={pageId} data={data?.data.memo_summaries} />
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
