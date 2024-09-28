import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';
import SVGBlueCloud from '@/assets/BlueCloud.svg?react';

const CreateMemo = ({ modalId }: { modalId: string }) => {
  const { modals, closeModal } = useModalStore();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 150;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setContent(input);
      setCharCount(input.length);
    }
  };

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
        <TitleInput type="text" placeholder="새 메모 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
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

        {/* 메모 내용 입력 필드 */}
        <InputContainer>
          <StyledInput placeholder="메모 내용을 입력하세요..." value={content} onChange={handleContentChange} />
          <CharCounter>
            {charCount}/{maxChars}자
          </CharCounter>
        </InputContainer>
        <ButtonContainer onClick={closeCreateModal}>Save</ButtonContainer>
      </ModalContent>
    </SidebarModal>
  );
};

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
    min-width: 400px;
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

const TitleInput = Styled.input`
  font-size: 2.5rem;
  padding: 12px;
  border: none;
  border-radius: 5px;
  margin-bottom: 8px;
  width: 100%;
  color: #4d4d4d;
  font-family: 'BMHANNA';
  outline: none;
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

const InputContainer = Styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 0 12px;
`;

const StyledInput = Styled.textarea`
  flex: 1;  
  padding: 16px;
  font-size: 1.2rem;
  border: 1px solid #82AFFF;
  border-radius: 25px;
  outline: none;
  resize: none;  
  font-family: 'BMHANNA';

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CharCounter = Styled.div`
  position: absolute;
  bottom: 24px;
  right: 16px;
  font-size: 0.9rem;
  color: #666;
  padding: 2px 5px;
  border-radius: 4px;
`;

const ButtonContainer = Styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: 'PressStart2P';
  padding: 14px 76px;
  background-color: #82AFFF;
  border: none;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 12px;
  font-size: 1.2rem;
  outline: none;
`;

export default CreateMemo;
