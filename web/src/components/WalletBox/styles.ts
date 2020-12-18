import styled from 'styled-components';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => props.color && props.color};
  min-height: 200px;
  width: 32%;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;

  & + div {
    margin-left: 10px;
  }

  > div {
    span {
      font-size: 28px;
      font-weight: 500;
    }
  }

  img {
    position: absolute;
    top: 10px;
    right: -20px;
    opacity: 0.4;
    z-index: auto;
  }

  small {
    z-index: 1000;
    max-width: 180px;
  }
`;
