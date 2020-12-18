import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface LinkProps {
  selected: boolean;
}

interface Mobile {
  menuMobile: boolean;
}

export const Container = styled.aside<Mobile>`
  background-color: #28262e;
  grid-area: ASIDE;
  height: 100vh;

  @media (min-width: 600px) {
    > button {
      display: none;
    }
  }

  @media (max-width: 500px) {
    z-index: 100;
    position: relative;
    height: ${props => (props.menuMobile ? '400px' : '100px')};

    > button {
      border: 0;
      background-color: transparent;
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 40px 16px;

  > a {
    margin-right: 16px;
    position: relative;

    img {
      height: 60px;
      width: 60px;
      object-fit: cover;
      border-radius: 50%;
    }

    svg {
      color: #00e0ff;
      position: absolute;
      bottom: 0;
      right: 5px;
    }
  }

  @media (max-width: 500px) {
    padding: 16px;
  }
`;

export const HeaderContent = styled.div`
  strong {
    color: #00e0ff;
  }

  p {
    font-size: 14px;
  }

  span {
    font-size: 10px;
  }

  @media (max-width: 500px) {
    p {
      font-size: 18px;
    }

    span {
      font-size: 16px;
    }
  }
`;

export const Content = styled.ul<Mobile>`
  margin-left: 16px;

  button {
    background-color: transparent;
    border: 0;
    display: flex;

    & + button {
      margin-top: 10px;
    }
  }

  @media (max-width: 500px) {
    max-width: 250px;
    margin-top: 50px;
    display: ${props => (props.menuMobile ? 'block' : 'none')};
  }
`;

// eslint-disable-next-line prettier/prettier
export const LinkMenu = styled(Link) <LinkProps>`
  align-items: center;
  display: flex;
  font-weight: 500;
  letter-spacing: 1px;
  transition: color 0.2s;

  ${props =>
    props.selected &&
    css`
      color: #00e0ff;
    `}

  > svg {
    font-size: 20px;
    margin-right: 8px;
  }

  &:hover {
    color: #00e0ff;
  }

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

export const ButtonLogout = styled.button`
  position: absolute;
  bottom: 15px;

  svg {
    color: #f4ede8;
    font-size: 25px;
    transition: color 0.2s;

    &:hover {
      color: #00e0ff;
    }
  }

  @media (max-width: 500px) {
    right: 20px;
    bottom: 20px;
  }
`;
