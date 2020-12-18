import styled, { css } from 'styled-components';
import Tooltip from 'components/Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 350px;
  background-color: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 10px;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1aa8be;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #1aa8be;
      color: #1aa8be;
    `}

  select {
    flex: 1;
    background-color: transparent;
    border: 0;
    color: #eaeaea;

    &:focus {
      background-color: #232129;
    }
  }

  svg {
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  height: 20px;

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
