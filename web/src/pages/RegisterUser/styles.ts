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
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;

  h1 {
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 20px;
  }

  > form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      margin-top: 8px;
      max-width: 130px;
      height: 40px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px;

    > form {
      flex-wrap: wrap;
      width: 100%;

      div {
        max-width: 100% !important;
        width: 100%;
      }

      button {
        margin-top: 20px;
        max-width: 100%;
        width: 100%;
      }
    }
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;
