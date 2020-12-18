import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: #1aa8be;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  height: 43px;
  border: 0;
  padding: 0 16px;
  margin-top: 14px;
  width: 350px;
  color: #eaeaea;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#1aa8be')};
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
