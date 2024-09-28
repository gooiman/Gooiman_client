import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';

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
      ariaHideApp={false} // 스크린 리더를 위한 설정
      closeTimeoutMS={300} // 모달 닫힐 때 애니메이션 시간
    >
      <ModalContent>
        <h2>Create Memo</h2>
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
  }

  &.ReactModal__Content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    background-color: #ffffff;
    padding: 60px 0px;
    overflow-y: auto;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); 
    transform: translateX(100%); 
    transition: transform 200ms ease-in-out;

  
    &.ReactModal__Content--after-open {
      transform: translateX(0); 
    }

    &.ReactModal__Content--before-close {
      transform: translateX(100%); 
    }
  }
`;

const ModalContent = Styled.div`
  h2 {
    margin-top: 0;
    font-size: 24px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:focus {
      outline: none;
    }
  }
`;

export default CreateMemo;
