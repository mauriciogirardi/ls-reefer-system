import { shade } from 'polished';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  max-width: 430px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  color: #585858;
  padding: 40px;

  animation: none;
  form {
    width: 100%;
    animation: none;
    display: flex;
    justify-content: space-between;

    input {
      color: #585858;
    }
  }

  @media (max-width: 500px) {
    padding: 20px;
    max-width: 350px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);

    form {
      flex-wrap: wrap;

      div {
        width: 100%;
      }
    }
  }
`;

export const HeaderModal = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  h1 {
    margin-bottom: 30px;
    font-size: 24px;
  }

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

  @media (max-width: 500px) {
    button {
      top: 0px;
      right: 0px;
    }
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
    height: calc(100% + 180px);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  width: 100%;
  margin: 0;

  div {
    & + div {
      width: 190px;
    }
    width: 150px;

    background-color: #fff;
    border-color: #fff;
  }

  @media (max-width: 500px) {
    max-width: 100%;
    flex-wrap: wrap;

    div {
      & + div {
        width: 100%;
      }
      width: 100%;
    }
  }
`;
