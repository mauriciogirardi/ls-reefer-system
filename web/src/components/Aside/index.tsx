import React, { useCallback, useState } from 'react';
import {
  FaCartPlus,
  FaCalendarPlus,
  FaArchive,
  FaUserCog,
  FaPowerOff,
  FaRegSun,
  FaGripLines,
  FaChartPie,
  FaMoneyBillAlt,
  FaUser,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/auth';

import {
  Container,
  Header,
  HeaderContent,
  Content,
  LinkMenu,
  ButtonLogout,
} from './styles';

const link = [
  { id: 0, title: 'Dashboard', to: '/dashboard', icon: <FaArchive /> },
  {
    id: 1,
    title: 'Cadastro de produtos',
    to: '/register-products',
    icon: <FaCartPlus />,
  },
  {
    id: 2,
    title: 'Cadastro de clientes',
    to: '/register-customers',
    icon: <FaUser />,
  },
  {
    id: 3,
    title: 'Cadastro de gastos',
    to: '/register-expense',
    icon: <FaMoneyBillAlt />,
  },
  {
    id: 4,
    title: 'Agendamento',
    to: '/appointments',
    icon: <FaCalendarPlus />,
  },
  {
    id: 5,
    title: 'Cadastro de usuário',
    to: '/register-users',
    icon: <FaUserCog />,
  },
  {
    id: 6,
    title: 'Relatórios',
    to: '/wallet',
    icon: <FaChartPie />,
  },
];

const Aside: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selected, setSelected] = useState(0);
  const [menuMobile, setMenuMobile] = useState(false);

  const handleMenuMobile = useCallback(() => {
    setMenuMobile(prevState => !prevState);
  }, []);

  const handleLinkSelect = useCallback((id: number) => {
    setSelected(id);
    setMenuMobile(prevState => !prevState);
  }, []);

  return (
    <Container menuMobile={menuMobile}>
      <button type="button" onClick={handleMenuMobile}>
        {menuMobile ? (
          <FiX size={30} color="#fff" />
        ) : (
          <FaGripLines size={30} color="#fff" />
        )}
      </button>

      <Header>
        <Link to="/profile">
          {user.avatar && <img src={user.avatar} alt={user.name} />}
          <FaRegSun />
        </Link>

        <HeaderContent>
          <strong>Bem,vindo</strong>
          <p>{user.name}</p>
          <span>{user.occupation}</span>
        </HeaderContent>
      </Header>

      <Content menuMobile={menuMobile}>
        {link.map(linkMenu => (
          <button
            type="button"
            key={linkMenu.id}
            onClick={() => handleLinkSelect(linkMenu.id)}
          >
            <LinkMenu to={linkMenu.to} selected={linkMenu.id === selected}>
              {linkMenu.icon}
              {linkMenu.title}
            </LinkMenu>
          </button>
        ))}
        <ButtonLogout type="button" onClick={signOut}>
          <FaPowerOff />
        </ButtonLogout>
      </Content>
    </Container>
  );
};

export default Aside;
