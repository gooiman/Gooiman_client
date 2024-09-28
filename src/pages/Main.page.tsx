import Styled from '@emotion/styled';

import Sidebar from '@/components/Sidebar';
import { useModalStore } from '@/store/useModalStore';
import CreateMemo from '@/components/modal/CustomModal';

const Main = () => {
  const { showModal } = useModalStore();

  // 모달을 띄우기 위한 버튼
  const openModal = () => {
    showModal('create-memo');
  };

  return (
    <MainContainer>
      <Sidebar />
      MainPage
      {/* // create memo modal open 버튼 */}
      <StyledButton onClick={openModal}>Open Modal</StyledButton>

      {/* // create memo modal */}
      <CreateMemo modalId="create-memo" />
    </MainContainer>
  );
};

const MainContainer = Styled.div`
  display: flex;
`;

const StyledButton = Styled.button`
  height: 40px;
  cursor: pointer;
`;

export default Main;
