import React from 'react';
import Grid from '@material-ui/core/Grid';

import logo from '../../img/header3.png';

const HeaderLogo = () => (
  <Grid container justify="center" alignItems="center">
    <img src={logo} width="40%" alt="Logo" />
  </Grid>
);

export default HeaderLogo;
