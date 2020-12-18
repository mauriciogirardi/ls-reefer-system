import styled, { keyframes } from 'styled-components';

const animateContainer = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }

`;

export const Container = styled.div`
  animation: ${animateContainer} 1s;
  max-width: 1050px;
  width: 100%;
  margin: 0 auto;

  > form {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1050px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    max-width: 330px;
  }

  > button {
    max-width: 330px;
    margin-top: 9px;
  }

  @media (max-width: 768px) {
    div {
      max-width: 100%;
      width: 100%;
    }

    > button {
      max-width: 100%;
      width: 100%;
      margin-top: 15px;
    }
  }
`;
