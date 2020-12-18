import React from 'react';

import { Container, ContainerTable } from './styles';

interface TableProps {
  nameOne?: string;
  nameTwo?: string;
  nameTree?: string;
  nameFour?: string;
  nameFive?: string;
}

const Table: React.FC<TableProps> = ({
  children,
  nameOne,
  nameTwo,
  nameTree,
  nameFour,
  nameFive,
}) => (
  <Container>
    <ContainerTable>
      <thead>
        <tr>
          <th>{nameOne}</th>
          <th>{nameTwo}</th>
          <th>{nameTree}</th>
          <th>{nameFour}</th>
          <th>{nameFive}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </ContainerTable>
  </Container>
);

export default Table;
