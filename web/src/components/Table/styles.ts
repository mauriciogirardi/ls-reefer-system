import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.main`
  margin-top: 50px;
  background-color: #3e3b47;
  padding: 20px;
  border-radius: 10px;
  height: 350px;
  overflow: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #28262e;
    border-radius: 0 10px 10px 0;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0 10px 10px 0;
    background-color: #999591;
  }
`;

export const ContainerTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid #f4ede8;

    tr {
      text-align: left;

      th {
        padding-bottom: 5px;
        margin-bottom: 50px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  tbody {
    tr {
      transition: background-color 0.2s;
      cursor: alias;

      &:hover {
        background-color: #43414c;
      }

      td {
        padding: 7px 0;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        button:first-child {
          svg {
            color: #1aa8be;
            margin-right: 10px;
            transition: color 0.2s;

            &:hover {
              color: ${shade(0.2, '#1aa8be')};
            }
          }
        }

        button {
          background-color: transparent;
          border: 0;

          svg {
            color: #c53030;
            transition: color 0.2s;

            &:hover {
              color: ${shade(0.2, '#c53030')};
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    thead {
      tr {
        th {
          display: none;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #f4ede8;
        td {
          display: block;

          padding: 3px 0;
        }
      }
    }
  }
`;
