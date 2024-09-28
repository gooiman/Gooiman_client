import styled from '@emotion/styled';
import CloudShape1 from '@/assets/CloudShape1.svg';
import CloudShape2 from '@/assets/CloudShape2.svg';
import CloudShape3 from '@/assets/CloudShape3.svg';
import CloudShape4 from '@/assets/CloudShape4.svg';
import CloudShape5 from '@/assets/CloudShape5.svg';

interface Props {
  subCategoryCount: number;
  totalCount: number;
  style?: React.CSSProperties;
  category: string;
}

const CloudContainer = ({ subCategoryCount, totalCount, style, category }: Props) => {
  const maxSize = 500;
  let cloudSize = 100 + totalCount * 20;
  if (cloudSize > maxSize) {
    cloudSize = maxSize; // 최대 크기 제한
  }
  let CloudShape = CloudShape5;
  if (subCategoryCount === 1) {
    CloudShape = CloudShape1;
  } else if (subCategoryCount === 2) {
    CloudShape = CloudShape2;
  } else if (subCategoryCount === 3) {
    CloudShape = CloudShape3;
  } else if (subCategoryCount === 4) {
    CloudShape = CloudShape4;
  } else if (subCategoryCount >= 5) {
    CloudShape = CloudShape5;
  }
  return (
    <Container style={style}>
      <CloudImage src={CloudShape} style={{ width: `${cloudSize}px` }} alt="cloud shape" />
      <Label>{category}</Label>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const CloudImage = styled.img``;

const Label = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

export default CloudContainer;
