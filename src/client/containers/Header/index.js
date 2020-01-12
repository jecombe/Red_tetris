import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import HeaderHome from './HeaderHome';
import HeaderLogo from '../../components/Header/HeaderLogo';
import HeaderConnect from './HeaderConnect';

const Header = () => (
  <AppBar color="secondary">
    <Grid container alignItems="center" spacing={4}>
      <Grid item xs={3} lg={4}>
        <HeaderHome />
      </Grid>
      <Grid item xs={6} lg={4}>
        <HeaderLogo />
      </Grid>
      <Grid item xs={3} lg={4}>
        <HeaderConnect />
      </Grid>
    </Grid>
  </AppBar>
);

export default Header;
