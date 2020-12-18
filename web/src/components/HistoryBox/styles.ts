import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from  {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  width: 100%;
  height: 300px;
  padding: 30px 30px 70px 10px;
  border-radius: 10px;
  overflow: hidden;

  animation: ${appearFromLeft} 1s;

  h2 {
    margin-bottom: 20px;
    margin-left: 20px;
  }
`;
