import Styled from '@emotion/styled';

interface TopicDropdownProps {
  mainTopic: string;
  setMainTopic: (value: string) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  handleAddTopic: () => void;
  colors: string[];
}

const TopicDropdown = ({
  mainTopic,
  setMainTopic,
  selectedColor,
  setSelectedColor,
  handleAddTopic,
  colors,
}: TopicDropdownProps) => {
  return (
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
  );
};

export default TopicDropdown;

// 스타일링 코드 그대로 유지
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
