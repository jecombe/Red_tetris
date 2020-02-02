import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import HeaderHomeConnect from './HeaderHomeConnect';
import HeaderLogo from '../../components/Header/HeaderLogo';
import HeaderStateConnect from './HeaderStateConnect';

const Header = () => (
  <AppBar color="secondary">
    <Grid container alignItems="center" spacing={4}>
      <Grid item xs={3} lg={4}>
        <HeaderHomeConnect />
      </Grid>
      <Grid item xs={6} lg={4}>
        <HeaderLogo />
      </Grid>
      <Grid item xs={3} lg={4}>
        <HeaderStateConnect />
      </Grid>
    </Grid>
  </AppBar>
);

export default Header;
