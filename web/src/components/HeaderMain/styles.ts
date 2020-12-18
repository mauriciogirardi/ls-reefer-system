import styled, { css, keyframes } from 'styled-components';

interface FormHeaderProps {
  isFocused: boolean;
}

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

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  animation: ${animationHeader} 0.8s;

  h1 {
    font-weight: 400;
    font-size: 24px;
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;

    h1 {
      margin-bottom: 20px;
    }
  }
`;

export const FormHeader = styled.form<FormHeaderProps>`
  width: 400px;
  border-radius: 10px;
  background-color: #232129;
  border: 2px solid #232129;
  padding: 10px;
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #00e0ff;
      color: #00e0ff;
    `}

  svg {
    margin-right: 10px;
  }

  > input {
    flex: 1;
    background-color: transparent;
    border: 0;
    color: #eaeaea;

    &::placeholder {
      color: #666360;
    }
  }
`;
