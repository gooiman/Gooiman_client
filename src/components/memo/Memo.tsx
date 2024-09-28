import styled from '@emotion/styled';

import SVGBlueCloud from '../../assets/BlueCloud.svg?react';
import SVGMemoPencil from '../../assets/MemoPencil.svg?react';

const Memo = () => {
  return (
    <MemoContainer>
      <MemoTitleContainer>
        <MemoTitle>해커톤 성공하는 법</MemoTitle>
      </MemoTitleContainer>
      <MemoContentContainer>
        <MemoContent>
          냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐냐
        </MemoContent>
      </MemoContentContainer>
      <CloudContainer>
        <OddCloudContainer>
          <SVGBlueCloud />
        </OddCloudContainer>
        <EvenCloudContainer>
          <SVGBlueCloud />
        </EvenCloudContainer>
        <OddCloudContainer>
          <SVGBlueCloud />
        </OddCloudContainer>
        <EvenCloudContainer>
          <SVGBlueCloud />
        </EvenCloudContainer>
        <MemoPencilContainer>
          <SVGMemoPencil />
        </MemoPencilContainer>
      </CloudContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  box-sizing: border-box;
  width: 20rem;
  height: 20rem;
  padding: 2rem;
  background-color: #4487ff;
  color: #ffffff;
`;

const MemoTitleContainer = styled.div`
  height: 2rem;
  margin-top: 1rem;
`;

const MemoTitle = styled.span`
  font-size: 2rem;
`;

const MemoContentContainer = styled.div`
  margin-top: 1rem;
`;

const MemoContent = styled.div`
  height: 8.5rem;
  font-size: 1rem;
  color: #3c3c3c;
`;

const CloudContainer = styled.div`
  display: flex;
`;

const OddCloudContainer = styled.div`
  margin-top: 1rem;
`;

const EvenCloudContainer = styled.div``;

const MemoPencilContainer = styled.div``;

export default Memo;
