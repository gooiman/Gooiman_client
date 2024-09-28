import styled from '@emotion/styled';
import { animated } from 'react-spring';
import Memo from '@/components/memo/Memo';
import { useEffect, useState } from 'react';
import { useDrag } from '@use-gesture/react';

const DetailMemo = () => {
  const [memoPositions, setMemoPositions] = useState([
    {
      id: 1,
      title: '메모1',
      content: '내용',
      author: 'lee',
      category: 'category1',
      sub_category: 'subCategory1',
      color: '#8bc34a',
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    {
      id: 2,
      title: '메모2',
      content: '내용',
      author: 'lee',
      category: 'category1',
      sub_category: 'subCategory2',
      color: '#8bc34a',
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    {
      id: 3,
      title: '메모3',
      content: '내용',
      author: 'lee',
      category: 'category1',
      sub_category: 'subCategory3',
      color: '#8bc34a',
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
  ]);

  const bindMemoPos = (id: number) =>
    useDrag((state) => {
      const speedFactor = 1; // 속도 조정 비율

      const newPositions = memoPositions.map((memo) => {
        if (memo.id === id) {
          const newX = state.offset[0] * speedFactor;
          const newY = state.offset[1] * speedFactor;
          return { ...memo, x: newX, y: newY, z: 0.1 };
        } else {
          return { ...memo, z: 0 }; // 나머지 메모의 z-index를 기본값으로
        }
      });

      setMemoPositions(newPositions);
    });

  return (
    <DetailMemoContainer>
      {memoPositions.map(({ id, title, content, x, y, z }) => (
        <animated.div
          key={id}
          {...bindMemoPos(id)()}
          style={{
            width: '20rem',
            height: '20rem',
            transform: `perspective(10px) translate3d(${x}px, ${y}px, ${z}px)`,
            touchAction: 'none', // 터치 이벤트를 방지하여 드래그 가능하게 설정
            position: 'fixed',
            transformStyle: 'preserve-3d',
          }}
        >
          <DraggableItem>
            <Memo id={id} title={title} content={content} />
          </DraggableItem>
        </animated.div>
      ))}
    </DetailMemoContainer>
  );
};

const DetailMemoContainer = styled.div`
  width: 90vw;
  height: 90vh;
  position: relative; /* 자식 요소의 절대 위치 지정을 위한 기준 설정 */
  transform: translateZ(0);
  transform-style: preserve-3d;
  @media (max-width: 500px) {
    transform: scale(0.5) translateZ(0); /* 줌 아웃 효과 */
    transform-origin: top left; /* 줌 아웃 기준점 설정 */
  }
`;

const DraggableItem = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  cursor: grab; /* 드래그 가능 표시 */
  overflow: visible; /* 드래그 시 잘리지 않도록 설정 */
  transform-style: preserve-3d;
  &:active {
    cursor: grabbing; /* 드래그 중에 표시 변경 */
  }
`;

export default DetailMemo;
