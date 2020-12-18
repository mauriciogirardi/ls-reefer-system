import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const logoAnimation = keyframes`
  0% {
    height: 0;
  }

  100%  {
    height: 42px;
  }
`;

const animationContainer = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  animation: ${animationContainer} 0.8s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  img {
    width: 300px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 350px;
    width: 100%;

    h1 {
      margin: 33px 0;
      font-size: 30px;
      color: #eaeaea;
    }

    a {
      color: #eaeaea;
      margin-top: 30px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#eaeaea')};
      }
    }
  }
  div {
    & + div {
      margin-top: 8px;
    }
  }
`;

export const Logo = styled.div`
  position: relative;
  max-width: 340px;
  width: 100%;

  div {
    background-color: #eaeaea;
    width: 10px;
    height: 30px;
    position: absolute;
    left: 23px;
    top: 25px;

    &::after {
      content: '';
      background-color: #33d1ea;
      border-radius: 5px 5px 0 0;
      width: 3.8px;
      height: 42px;
      position: absolute;
      left: 3.5px;
      bottom: 0;
      animation: ${logoAnimation} 5s;
    }
  }
`;
