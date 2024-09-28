import Styled from '@emotion/styled';

interface MemoInputProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
  maxChars: number;
}

const MemoInput: React.FC<MemoInputProps> = ({ content, onChange, charCount, maxChars }) => {
  return (
    <InputContainer>
      <StyledInput placeholder="메모 내용을 입력하세요..." value={content} onChange={onChange} />
      <CharCounter>
        {charCount}/{maxChars}자
      </CharCounter>
    </InputContainer>
  );
};

export default MemoInput;

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
