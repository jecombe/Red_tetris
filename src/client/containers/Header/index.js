import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// import HeaderHome from '../components/Header/HeaderHome';
// import HeaderLogo from '../components/Header/HeaderLogo';
// import HeaderConnectIcon from '../components/Header/HeaderConnectIcon';

import HeaderHomeConnect from './HeaderHomeConnect';
import HeaderLogo from '../../components/Header/HeaderLogo';
import HeaderStateConnect from './HeaderStateConnect';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar color="inherit">
      <Grid container alignItems="center" className={classes.rootHeader}>
        <Grid item xs={3} container justify="center">
          <HeaderHomeConnect />
        </Grid>
        <Grid item xs={6} container justify="center">
          <HeaderLogo />
        </Grid>
        <Grid item xs={3} container justify="center">
          <HeaderStateConnect />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
