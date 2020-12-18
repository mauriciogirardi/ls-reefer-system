import styled, { css } from 'styled-components';
import Tooltip from 'components/Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 350px;
  background-color: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 10px;
  color: #666360;
  margin-top: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #00e0ff;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #00e0ff;
      color: #00e0ff;
    `}

  input {
    width: 100%;
    background-color: transparent;
    border: 0;
    color: #eaeaea;

    &::placeholder {
      color: #666360;
    }
  }

  input[type='date'] {
    background-color: transparent;
    border: 0;
    color: #eaeaea;
    max-width: 160px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  svg {
    margin: 0;
    cursor: pointer;
  }

  span {
    background-color: #c53030;

    &::after {
      background-color: #c53030;
    }
  }
`;
