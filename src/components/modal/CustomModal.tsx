import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';
import SVGBlueCloud from '@/assets/BlueCloudCreate.svg?react';
import SVGTrash from '@/assets/Trash.svg?react';
import AlertModal from './AlertModal';

const colors = ['#82AFFF', '#FF6B6B', '#FFE66D', '#6BFFB3', '#B39CD0'];

const CreateMemo = ({ modalId }: { modalId: string }) => {
  const { modals, closeModal } = useModalStore();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const [mainTopic, setMainTopic] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedTopicBlock, setSelectedTopicBlock] = useState<{ color: string; text: string } | null>(null);
  const maxChars = 150;
  const [showModal, setShowModal] = useState<boolean>(false); // 삭제 ox alert 모달

  // 모달을 띄우기 위한 버튼
  const openSaveModal = () => {
    setShowModal(true);
  };

  // 저장 완료시 로직
  const onSaveSuccess = () => {
    setShowModal(false);
    closeModal(modalId);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setContent(input);
      setCharCount(input.length);
    }
  };

  const handleAddTopic = () => {
    if (mainTopic.trim() !== '') {
      setSelectedTopicBlock({ color: selectedColor, text: mainTopic });
      setShowDropdown(false);
      setMainTopic('');
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
        <SVGTrash onClick={closeCreateModal} />
        <Underline />

        <TopicContainer>
          <SVGBlueCloud />
          <TextTitle>대주제</TextTitle>
          {selectedTopicBlock ? (
            <TopicBlock color={selectedTopicBlock.color}>
              {selectedTopicBlock.text}
              <RemoveButton onClick={() => setSelectedTopicBlock(null)}>X</RemoveButton>
            </TopicBlock>
          ) : (
            <TextWrapper onClick={() => setShowDropdown(!showDropdown)}>+</TextWrapper>
          )}

          {/* 드롭다운 메뉴 */}
          {showDropdown && (
            <DropdownMenu>
              <TopicInput
                type="text"
                placeholder="주제 입력"
                value={mainTopic}
                onChange={(e) => setMainTopic(e.target.value)}
              />
              <ColorSelectContainer>
                {colors.map((color, index) => (
                  <ColorOption key={index} onClick={() => setSelectedColor(color)} selected={selectedColor === color}>
                    <ColorCircle color={color} />
                  </ColorOption>
                ))}
              </ColorSelectContainer>
              <AddTopicButton onClick={handleAddTopic}>완료</AddTopicButton>
            </DropdownMenu>
          )}
        </TopicContainer>

        {/* 메모 내용 입력 필드 */}
        <InputContainer>
          <StyledInput placeholder="메모 내용을 입력하세요..." value={content} onChange={handleContentChange} />
          <CharCounter>
            {charCount}/{maxChars}자
          </CharCounter>
        </InputContainer>
        <ButtonContainer onClick={openSaveModal}>Save</ButtonContainer>
      </ModalContent>

      {/* Alert 모달 */}
      <AlertModal isOpen={showModal} title="이 메모장을" message="삭제하시겠습니까?" onSuccess={onSaveSuccess} />
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

    @media (max-width: 768px) {
      min-width: 90dvw;
    }

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

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Underline = Styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 28px;
`;

const TopicContainer = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: relative; 
`;

const TextTitle = Styled.div`
  font-size: 1.5rem;
  color: #4d4d4d;
  padding-right: 12px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TextWrapper = Styled.div`
  font-size: 2rem;
  color: #007bff;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TopicInput = Styled.input`
  font-size: 1.2rem;
  padding: 8px;
  border: 1px solid #82AFFF;
  border-radius: 5px;
  outline: none;
  width: 200px;

  &::placeholder {
    color: #bbb;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 드롭다운이 버튼 아래에 표시되도록 조정
const DropdownMenu = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
`;

const ColorSelectContainer = Styled.div`
  display: flex;
  gap: 10px;
`;

const ColorOption = Styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 5px;
  border: ${(props) => (props.selected ? '2px solid #007bff' : 'none')};
  border-radius: 50%;
`;

const ColorCircle = Styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const AddTopicButton = Styled.button`
  padding: 8px 16px;
  background-color: #82AFFF;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;

const TopicBlock = Styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 8px 12px;
  border-radius: 5px;
  color: #fff;
  display: flex;
  align-items: center;
`;

const RemoveButton = Styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 8px;
  cursor: pointer;
`;

const InputContainer = Styled.div`
  flex: 1;
  display: flex;
  margin-top: 45px;
  flex-direction: column;
  position: relative;
  padding: 0 0 12px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
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

  @media (max-width: 768px) {
    font-size: 1rem;
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

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
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

  @media (max-width: 768px) {
    padding: 10px 40px;
    font-size: 1rem;
  }
`;

export default CreateMemo;
