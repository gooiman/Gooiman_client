import styled from '@emotion/styled';
import CloudContainer from './CloudContainer';

interface Props {
  pageId: string | null;
  data?: {
    [key: string]: {
      [key: string]: string[];
    };
  };
}

// const mockData: { [key: string]: { [key: string]: string[] } } = {
//   연합해커톤: {
//     sub_category1: ['제목1', '제목2'],
//     sub_category2: ['제목3', '제목4'],
//     sub_category3: ['제목3', '제목4'],
//     sub_category4: ['제목3', '제목4'],
//   },
//   단풍톤: {
//     sub_category3: ['제목5', '제목6'],
//     sub_category4: ['제목7', '제목8', '9', '10', '11'],
//     sub_category5: ['제목7', '제목8', '9', '10', '11'],
//     sub_category6: ['제목7', '제목8', '9', '10', '11'],
//     sub_category7: ['제목7', '제목8', '9', '10', '11'],
//     sub_category8: ['제목7', '제목8', '9', '10', '11'],
//     sub_category9: ['제목7', '제목8', '9', '10', '11'],
//     sub_category10: ['제목7', '제목8', '9', '10', '11'],
//     sub_category11: ['제목7', '제목8', '9', '10', '11'],
//   },
//   벚꽃톤: {
//     sub_category1: ['제목5', '제목6'],
//   },
//   구름톤: {
//     sub_category1: ['제목5', '제목6'],
//   },
// };

const getRandomPositionWithinRange = (min: number, max: number) => {
  return min + Math.random() * (max - min); // min과 max 사이의 랜덤 값 반환
};

const getPosition = (index: number) => {
  const positions = [
    { topBase: 5, leftBase: 5 }, // 첫 번째: 왼쪽 상단
    { topBase: 45, leftBase: 5 }, // 두 번째: 왼쪽 하단
    { topBase: 45, leftBase: 45 }, // 세 번째: 오른쪽 하단
  ];

  const basePosition = positions[index % positions.length];

  const topOffset = getRandomPositionWithinRange(0, 30);
  const leftOffset = getRandomPositionWithinRange(0, 30);

  return {
    top: `calc(${basePosition.topBase}% + ${topOffset}%)`,
    left: `calc(${basePosition.leftBase}% + ${leftOffset}%)`,
  };
};

const CloudArea = ({ pageId, data }: Props) => {
  if (!pageId) {
    return <Container>페이지가 없습니다.</Container>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <Container>구름을 생성하세요.</Container>;
  }

  const categories = Object.keys(data);

  return (
    <Container>
      {categories.map((category, index) => {
        const subCategories = Object.values(data[category]);
        const totalCount = subCategories.reduce((sum, currentArray) => sum + currentArray.length, 0);
        const { top, left } = getPosition(index);
        return (
          <CloudContainer
            key={index}
            subCategoryCount={subCategories.length}
            totalCount={totalCount}
            style={{ position: 'absolute', top, left }}
            category={category}
          ></CloudContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  color: var(--skyBlue1);
  justify-content: center;
  height: 82%;
  position: relative;
`;

export default CloudArea;
