import styled from '@emotion/styled';

interface Props {
  onClick: () => void;
}

const LoginButton: React.FC<Props> = ({ onClick }) => {
  return <ButtonContainer onClick={onClick}>login</ButtonContainer>;
};

const ButtonContainer = styled.button`
  background-color: var(--skyBlue1);
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-family: 'PressStart2P', sans-serif;
`;

export default LoginButton;
