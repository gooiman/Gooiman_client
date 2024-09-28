import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import Modal from 'react-modal';
import Styled from '@emotion/styled';
import SVGBlueCloud from '@/assets/BlueCloudCreate.svg?react';
import SVGTrash from '@/assets/Trash.svg?react';
import SVGPencil from '@/assets/Pencil.svg?react';
import AlertModal from '@/components/modal/AlertModal';
import TopicDropdown from '@/components/modal/TopicDropdown';
import MemoInput from '@/components/modal/MemoInput';
import { useCreateMemo } from '@/api/hooks/useMemo';
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { json } from 'stream/consumers';

const colors = ['#82AFFF', '#FF6B6B', '#FFE66D', '#6BFFB3', '#B39CD0'];
const maxChars = 150;

interface CreateMemoProps {
  modalId: string;
}

interface TopicState {
  mainTopic: string;
  selectedColor: string;
  showDropdown: boolean;
  selectedTopicBlock: { color: string; text: string } | null;
}

const CreateMemo = ({ modalId }: CreateMemoProps) => {
  const { modals, closeModal } = useModalStore();
  const { pageId, name } = useUserStore();

  const [mainTopicState, setMainTopicState] = useState<TopicState>({
    mainTopic: '',
    selectedColor: colors[0],
    selectedTopicBlock: null,
    showDropdown: false,
  });

  const [subTopicState, setSubTopicState] = useState<TopicState>({
    mainTopic: '',
    selectedColor: colors[0],
    selectedTopicBlock: null,
    showDropdown: false,
  });

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const [showDeleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);

  const createMemoMutation = useCreateMemo(); // 메모 생성/수정 훅
  const queryClient = useQueryClient();

  if (!pageId) {
    return null;
  }

  // 모달 다 닫기
  const closeAllModals = () => {
    closeModal(modalId);
    setDeleteAlert(false);
    setShowSaveAlert(false);
  };

  // 삭제 시 로직
  const handleDelete = () => {
    closeModal(modalId);
    setDeleteAlert(false);
  };

  // 저장 완료시 로직
  const onSaveSuccess = () => {
    if (!mainTopicState.selectedTopicBlock || !subTopicState.selectedTopicBlock) {
      console.error('주제 또는 소주제가 선택되지 않았습니다.');
      return;
    }

    const memoData = {
      page_id: pageId,
      author: name,
      title,
      category: mainTopicState.selectedTopicBlock.text,
      sub_category: subTopicState.selectedTopicBlock.text,
      content,
      color: mainTopicState.selectedTopicBlock.color,
    };

    createMemoMutation.mutate(memoData, {
      onSuccess: () => {
        closeModal(modalId);
        console.log('메모 저장 완료:', memoData);
        setShowSaveAlert(false);
        queryClient.invalidateQueries({ queryKey: ['pageInfo'] });
      },
      onError: (error) => {
        console.error('메모 저장 실패:', error);
      },
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setContent(input);
      setCharCount(input.length);
    }
  };

  const handleAddMainTopic = () => {
    if (mainTopicState.mainTopic.trim() !== '') {
      setMainTopicState({
        ...mainTopicState,
        selectedTopicBlock: { color: mainTopicState.selectedColor, text: mainTopicState.mainTopic },
        showDropdown: false,
        mainTopic: '',
      });
    }
  };

  const handleAddSubTopic = () => {
    if (subTopicState.mainTopic.trim() !== '') {
      setSubTopicState({
        ...subTopicState,
        selectedTopicBlock: { color: subTopicState.selectedColor, text: subTopicState.mainTopic },
        showDropdown: false,
        mainTopic: '',
      });
    }
  };

  const toggleMainDropdown = () => {
    setMainTopicState({ ...mainTopicState, showDropdown: !mainTopicState.showDropdown });
  };

  const toggleSubDropdown = () => {
    setSubTopicState({ ...subTopicState, showDropdown: !subTopicState.showDropdown });
  };

  const removeMainTopicBlock = () => {
    setMainTopicState({ ...mainTopicState, selectedTopicBlock: null });
  };

  const removeSubTopicBlock = () => {
    setSubTopicState({ ...subTopicState, selectedTopicBlock: null });
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

        {/* 대주제 선택 */}
        <TopicContainer>
          <SVGBlueCloud />
          <TextTitle>대주제</TextTitle>
          {mainTopicState.selectedTopicBlock ? (
            <TopicBlock>
              {mainTopicState.selectedTopicBlock.text}
              <RemoveButton onClick={removeMainTopicBlock}>X</RemoveButton>
            </TopicBlock>
          ) : (
            <TextWrapper onClick={toggleMainDropdown}>+</TextWrapper>
          )}
          {mainTopicState.showDropdown && (
            <TopicDropdown
              topicState={mainTopicState}
              setTopicState={setMainTopicState}
              colors={[]}
              handleAddTopic={handleAddMainTopic}
              isMainTopic={true}
            />
          )}
        </TopicContainer>

        {/* 소주제 선택 */}
        <TopicContainer>
          <SVGPencil />
          <TextTitleSecond>소주제</TextTitleSecond>
          {subTopicState.selectedTopicBlock ? (
            <TopicBlock color={subTopicState.selectedTopicBlock.color}>
              <BlockColor color={subTopicState.selectedTopicBlock.color} />
              {subTopicState.selectedTopicBlock.text}
              <RemoveButton onClick={removeSubTopicBlock}>X</RemoveButton>
            </TopicBlock>
          ) : (
            <TextWrapper onClick={toggleSubDropdown}>+</TextWrapper>
          )}
          {subTopicState.showDropdown && (
            <TopicDropdown
              topicState={subTopicState}
              setTopicState={setSubTopicState}
              colors={colors}
              handleAddTopic={handleAddSubTopic}
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
        onSuccess={handleDelete}
      />
      <AlertModal
        isOpen={showSaveAlert}
        title="저장되지 않았습니다!"
        message="이대로 종료하시겠습니까?"
        onClose={() => setShowSaveAlert(false)}
        onSuccess={closeAllModals}
      />
    </SidebarModal>
  );
};

// 스타일 정의는 기존과 동일합니다
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
    border-radius: 25px 0px 0px 25px;

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

const TextTitleSecond = Styled.div`
  font-size: 1.5rem;
  color: #4d4d4d;
  margin-left: -10px;
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

const TopicBlock = Styled.div`
  background-color: var(--skyBlue3);
  padding: 8px 12px;
  border-radius: 5px;
  color: #000;
  display: flex;
  align-items: center;
`;

const BlockColor = Styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  margin-right: 24px;
`;

const RemoveButton = Styled.button`
  background: none;
  border: none;
  color: #000;
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
