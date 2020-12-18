import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MAIN;
  width: 100%;
  max-width: 100%;
  padding: 30px 0;
  height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #28262e;
  }

  ::-webkit-scrollbar-track {
    background-color: #3e3b47;
  }

  /* @media (min-width: 1300px) {
    max-width: 1117px;
  } */

  @media (max-width: 500px) {
    padding: 30px 16px;
    margin-top: 40px;
  }
`;
