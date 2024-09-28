import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';
import SVGBlueCloud from '@/assets/BlueCloudCreate.svg?react';
import SVGTrash from '@/assets/Trash.svg?react';
import AlertModal from '@/components/modal/AlertModal';
import TopicDropdown from '@/components/modal/TopicDropdown';
import MemoInput from '@/components/modal/MemoInput';

const colors = ['#82AFFF', '#FF6B6B', '#FFE66D', '#6BFFB3', '#B39CD0'];
const maxChars = 150;

const CreateMemo = ({ modalId }: { modalId: string }) => {
  const { modals, closeModal } = useModalStore();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const [mainTopic, setMainTopic] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedTopicBlock, setSelectedTopicBlock] = useState<{ color: string; text: string } | null>(null);
  const [showDeleteAlert, setDeleteAlert] = useState<boolean>(false); // 삭제 모달 on/off
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false); // 저장 완료 모달 on/off

  // 저장 완료시 로직
  const onSaveSuccess = () => {
    closeModal(modalId);
  };

  // 삭제 완료 시 로직
  const onDeleteSuccess = () => {
    setDeleteAlert(false);
    closeModal(modalId);
  };

  // 사이드바 닫기 완료 클릭 시 로직
  const closeSidebarSuccess = () => {
    setShowSaveAlert(false);
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

  return (
    <SidebarModal
      isOpen={modals === modalId}
      onRequestClose={() => setShowSaveAlert(true)}
      contentLabel="Create Memo"
      ariaHideApp={false}
      closeTimeoutMS={300}
    >
      <ModalContent>
        <HeaderContainer>
          <TitleInput type="text" placeholder="새 메모 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <SVGTrash onClick={() => setDeleteAlert(true)} />
        </HeaderContainer>
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
            <TopicDropdown
              mainTopic={mainTopic}
              setMainTopic={setMainTopic}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              handleAddTopic={handleAddTopic}
              colors={colors}
            />
          )}
        </TopicContainer>

        {/* 메모 내용 입력 필드 */}
        <MemoInput content={content} onChange={handleContentChange} charCount={charCount} maxChars={maxChars} />
        <ButtonContainer onClick={onSaveSuccess}>Save</ButtonContainer>
      </ModalContent>

      {/* Alert 모달 */}
      <AlertModal
        isOpen={showDeleteAlert}
        title="이 메모장을"
        message="삭제하시겠습니까?"
        onClose={() => setDeleteAlert(false)}
        onSuccess={onDeleteSuccess}
      />
      {/* 저장 on/ox 에러 처리 */}
      <AlertModal
        isOpen={showSaveAlert}
        title="저장되지 않았습니다!"
        message="이대로 종료하시겠습니까?"
        onClose={() => setShowSaveAlert(false)}
        onSuccess={closeSidebarSuccess}
      />
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

const HeaderContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
