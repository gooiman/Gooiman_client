import Styled from '@emotion/styled';
import Modal from 'react-modal';

interface AlertModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const AlertModal = ({ title, message, isOpen, onClose, onSuccess }: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Alert" ariaHideApp={false} style={ModalStyle}>
      <ModalContent>
        <TextWrapper>
          <Title>{title}</Title>
          <Title>{message}</Title>
        </TextWrapper>
        <CloseButton onClick={onSuccess}>YES</CloseButton>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;

const ModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '10px',
    padding: '0',
  },
};

const ModalContent = Styled.div`
  padding: 20px 45px;
`;
const TextWrapper = Styled.div`
  margin: 57px 0 30px;
`;

const Title = Styled.div`
  font-size: 1.5rem;
`;

const CloseButton = Styled.button`
  padding: 10px 20px;
  background-color: var(--skyBlue1);
  // 중앙 정렬
  margin: 0 auto;
  display: block;
  font-family: 'PressStart2P';
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
