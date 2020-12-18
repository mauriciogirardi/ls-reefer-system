import React, { useCallback } from 'react';
import CountUp from 'react-countup';

import arrowDonwSvg from 'assets/arrow-down.svg';
import arrowUpSvg from 'assets/arrow-up.svg';
import dolarSvg from 'assets/dolar.svg';

import { Container } from './styles';

interface WalletProps {
  color: string;
  footerLabel?: string;
  title: string;
  icon?: 'dolar' | 'arrowUp' | 'arrowDown';
}

const WalletBox: React.FC<WalletProps> = ({
  color,
  icon,
  title,
  footerLabel,
}) => {
  const iconSeleced = useCallback(() => {
    switch (icon) {
      case 'dolar':
        return dolarSvg;
      case 'arrowDown':
        return arrowDonwSvg;
      case 'arrowUp':
        return arrowUpSvg;
      default:
        return '';
    }
  }, [icon]);

  return (
    <Container color={color}>
      <div>
        <span>{title}</span>
        <h1>
          <CountUp
            end={2000}
            prefix="R$ "
            separator="."
            decimal=","
            decimals={2}
          />
        </h1>
      </div>
      <small>{footerLabel}</small>
      <img src={iconSeleced()} alt={title} />
    </Container>
  );
};
export default WalletBox;
