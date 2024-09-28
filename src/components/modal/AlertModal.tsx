import Styled from '@emotion/styled';
import Modal from 'react-modal';

interface AlertModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onSuccess: () => void;
}
const AlertModal = ({ title, message, isOpen, onSuccess }: AlertModalProps) => {
  const closeModalAction = () => {
    onSuccess();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalAction}
      contentLabel="Alert"
      ariaHideApp={false}
      style={ModalStyle}
    >
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <CloseButton onClick={closeModalAction}>확인</CloseButton>
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
  padding: 20px;
`;

const Title = Styled.h1`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Message = Styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const CloseButton = Styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
