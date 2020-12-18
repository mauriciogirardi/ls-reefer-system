import React from 'react';

import Aside from 'components/Aside';
import Main from 'components/Main';

import { Grid } from './styles';

const Layout: React.FC = ({ children }) => (
  <Grid>
    <Aside />
    <Main>{children}</Main>
  </Grid>
);

export default Layout;
