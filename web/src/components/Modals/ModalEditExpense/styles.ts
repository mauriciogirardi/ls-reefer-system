import { shade } from 'polished';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #312e38;
  border-radius: 10px;
  max-width: 435px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  color: #f4ede8;
  padding: 40px;

  animation: none;
  form {
    max-width: 350px;
    width: 100%;
    animation: none;

    h1 {
      margin-bottom: 30px;
      font-size: 24px;
    }

    input {
      color: #f4ede8;
    }
  }

  @media (max-width: 500px) {
    max-width: 335px;
  }
`;

export const HeaderModal = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  button {
    position: absolute;
    top: -60px;
    right: -60px;
    background-color: #00e0ff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    svg {
      color: #585858;
      font-size: 24px;
    }

    &:hover {
      background-color: ${shade(0.2, '#00e0ff')};
    }
  }

  span {
    margin-left: auto;
  }
`;

export const BackgroundModal = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  border: 0;
  cursor: alias;

  @media (max-width: 500px) {
    height: calc(100% + 100px);
  }
`;
