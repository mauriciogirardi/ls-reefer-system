import React from 'react';

import listOfMonths from 'utils/listOfMonths';

import WalletBox from 'components/WalletBox';
import HistoryBox from 'components/HistoryBox';

import { Container, ContentWallet } from './styles';

const Wallet: React.FC = () => (
  <Container>
    <ContentWallet>
      <WalletBox
        color="#4e41f0"
        title="Saldo"
        icon="dolar"
        footerLabel="Atualizado com base nas entradas e saídas"
      />
      <WalletBox
        color="#F7931B"
        title="Entrada"
        icon="arrowDown"
        footerLabel="Atualizado com base nas entradas"
      />
      <WalletBox
        color="#E44C4E"
        title="Saída"
        icon="arrowUp"
        footerLabel="Atualizado com base nas saídas"
      />
    </ContentWallet>

    {/* <HistoryBox
      data={}
      lineColorAmountEntry="#F7931B"
      lineColorAmountExit="#E44C4E"
    /> */}
  </Container>
);

export default Wallet;
