import styled from '@emotion/styled';

interface Props {
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<Props> = ({ text, value, onChange }) => {
  return (
    <Container>
      <Label>{text}</Label>
      <InputContainer value={value} onChange={onChange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 100%;
`;

const Label = styled.p`
  font-size: 16px;
  font-family: 'PressStart2P', sans-serif;
  color: var(--gray5);
  margin: 0;
  flex-shrink: 0;
  flex: 1;
  text-align: center;
`;

const InputContainer = styled.input`
  border: 1px solid var(--skyBlue1);
  border-radius: 5px;
  background-color: var(--skyBlue3);
  width: 100%;
  height: 35px;
  flex: 2;
  &:focus {
    outline: none;
  }
  padding: 10px;
  box-sizing: border-box;
`;

export default LoginInput;
