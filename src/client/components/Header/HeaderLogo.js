import React from 'react';
import Grid from '@material-ui/core/Grid';

import logo from '../../img/header1.png';

const HeaderLogo = () => (
  <Grid container justify="center">
    <img src={logo} width="35%" alt="Logo" />
  </Grid>
);

export default HeaderLogo;
