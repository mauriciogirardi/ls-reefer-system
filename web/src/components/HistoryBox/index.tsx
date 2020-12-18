import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

import formatCurrency from 'utils/formatCurrency';

import { Container } from './styles';

interface IHistoryBox {
  data: {
    month: string;
    amountEntry: number;
    amountExit: number;
  }[];

  lineColorAmountEntry: string;
  lineColorAmountExit: string;
}

const HistoryBox: React.FC<IHistoryBox> = ({
  data,
  lineColorAmountEntry,
  lineColorAmountExit,
}) => (
  <Container>
    <h2>Histórico de saldo</h2>

    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
        <XAxis dataKey="month" stroke="#cecece" />
        <YAxis stroke="#cecece" />
        <Tooltip formatter={value => formatCurrency(Number(value))} />
        <Legend />

        <Line
          type="monotone"
          dataKey="amountEntry"
          name="Entradas"
          stroke={lineColorAmountEntry}
          strokeWidth={2}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />

        <Line
          type="monotone"
          dataKey="amountExit"
          name="Saída"
          stroke={lineColorAmountExit}
          strokeWidth={2}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Container>
);

export default HistoryBox;
