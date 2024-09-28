import { TopicState } from '@/types/memo';
import Styled from '@emotion/styled';

interface TopicDropdownProps {
  topicState: TopicState;
  setTopicState: (value: React.SetStateAction<TopicState>) => void;
  handleAddTopic: () => void;
  colors: string[];
  isMainTopic?: boolean;
}

const TopicDropdown = ({ topicState, setTopicState, handleAddTopic, colors, isMainTopic }: TopicDropdownProps) => {
  const { mainTopic } = topicState;

  return (
    <DropdownMenu isMainTopic={isMainTopic}>
      <TopicInput
        type="text"
        placeholder={isMainTopic ? '대주제 입력' : '소주제 입력'}
        value={mainTopic}
        onChange={(e) => setTopicState((prevState) => ({ ...prevState, mainTopic: e.target.value }))}
      />
      {!isMainTopic && (
        <ColorSelectContainer>
          {colors.map((color, index) => (
            <ColorOption
              key={index}
              onClick={() => setTopicState((prevState) => ({ ...prevState, selectedColor: color }))}
              selected={topicState.selectedColor === color}
            >
              <ColorCircle color={color} />
            </ColorOption>
          ))}
        </ColorSelectContainer>
      )}
      <AddTopicButton isMainTopic={isMainTopic} onClick={handleAddTopic}>
        완료
      </AddTopicButton>
    </DropdownMenu>
  );
};

export default TopicDropdown;

// 스타일 정의
const DropdownMenu = Styled.div<{ isMainTopic?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 16px;
  align-items: center;
  padding: ${({ isMainTopic }) => (isMainTopic ? '10px 0' : '10px')};
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
`;

const TopicInput = Styled.input`
  font-size: 1.2rem;
  margin: 8px;
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

const AddTopicButton = Styled.button<{ isMainTopic?: boolean }>`
  padding: ${({ isMainTopic }) => (isMainTopic ? '6px 12px' : '8px 16px')};
  background-color: #82AFFF;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: ${({ isMainTopic }) => (isMainTopic ? '5px 10px' : '6px 12px')};
    font-size: 0.9rem;
  }
`;
