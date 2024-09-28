import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';
import SVGBlueCloud from '@/assets/BlueCloud.svg?react';

const CreateMemo = ({ modalId }: { modalId: string }) => {
  const { modals, closeModal } = useModalStore();

  const closeCreateModal = () => {
    closeModal(modalId);
  };

  return (
    <SidebarModal
      isOpen={modals === modalId}
      onRequestClose={closeCreateModal}
      contentLabel="Create Memo"
      ariaHideApp={false} 
      closeTimeoutMS={300} 
    >
      <ModalContent>
        <HeaderText>새 메모 제목</HeaderText>
        <Underline />
        <TopicContainer>
          <TopicContent>
            <SVGBlueCloud />
            <TextWrapper>대주제</TextWrapper>
            <TextWrapper>주제 선택</TextWrapper>
          </TopicContent>
          <TopicContent>
            <SVGBlueCloud />
            <TextWrapper>소주제</TextWrapper>
            <TextWrapper>주제 선택</TextWrapper>
          </TopicContent>
        </TopicContainer>

        {/* 텍스트 입력 가능한 input 박스 */}
        <InputContainer>
          <StyledInput placeholder="메모 내용을 입력하세요..." />
        </InputContainer>

        <button onClick={closeCreateModal}>Close Modal</button>
      </ModalContent>
    </SidebarModal>
  );
};

// 모달의 스타일을 사이드바 형식으로 조정
const SidebarModal = Styled(Modal)`
  &.ReactModal__Overlay {
    display: flex;
    justify-content: flex-end; 
    align-items: flex-start;
    transition: opacity 200ms ease-in-out;
    height: 100vh;
  }

  &.ReactModal__Content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100vh; 
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    transform: translateX(100%); 
    transition: transform 300ms ease-in-out;

    &.ReactModal__Content--after-open {
      transform: translateX(0); 
    }

    &.ReactModal__Content--before-close {
      transform: translateX(100%);
    }
  }
`;

const ModalContent = Styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 60px 48px;
  height: 100%;
`;

const HeaderText = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 2.5rem;
  color: #4d4d4d;
`;

const Underline = Styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 28px;
`;

const TopicContainer = Styled.div`
  display: flex;
  margin-bottom: 45px;
  flex-direction: column;
`;

const TopicContent = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const TextWrapper = Styled.div`
  font-size: 2rem;
`;

// Input 필드 스타일링
const InputContainer = Styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  padding: 0 0 12px;
`;

const StyledInput = Styled.textarea`
  flex: 1;  
  padding: 12px;
  font-size: 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  outline: none;
  resize: none;  
  

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export default CreateMemo;
