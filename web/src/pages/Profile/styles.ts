import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const animationHeader = keyframes`
   0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationContainer = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  animation: ${animationContainer} 0.8s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 340px;
    width: 100%;
    margin-top: 80px;

    h1 {
      margin: 16px 0;
      font-size: 24px;
      align-self: flex-start;
    }
  }
  div {
    & + div {
      margin-top: 8px;
    }
  }
`;

export const ProfileAvatar = styled.header`
  background-color: #28262e;
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  align-self: center;
  justify-content: center;
  animation: ${animationHeader} 0.8s;

  a {
    position: absolute;
    left: 20%;
    top: 50%;
    transform: translateY(-50%);
    > svg {
      font-size: 30px;
    }
  }

  @media (max-width: 500px) {
    a {
      left: 5%;
      top: 25%;
    }
  }
`;

export const Avatar = styled.div`
  position: absolute;
  top: 50px;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }

  label {
    background-color: #00e0ff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    > svg {
      font-size: 24px;
      color: #312e38;
    }

    &:hover {
      background-color: ${shade(0.2, '#00e0ff')};
    }
  }
`;
