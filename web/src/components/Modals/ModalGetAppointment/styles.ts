import { shade } from 'polished';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #312e38;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  color: #f4ede8;
  padding: 40px;

  h2 {
    margin-bottom: 10px;
    border-bottom: 1px solid #585858;
    font-size: 20px;
  }
`;

export const HeaderModal = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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

  p {
    display: flex;
    align-items: center;
    font-size: 18px;

    svg {
      color: #00e0ff;
      margin-right: 8px;
    }

    & + p {
      margin-left: 35px;
    }
  }

  span {
    margin-left: auto;
    font-size: 18px;
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
`;

export const Client = styled.div`
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Address = styled.div`
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    line-height: 25px;
  }
`;

export const Service = styled.div`
  p {
    line-height: 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
