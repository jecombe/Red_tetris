import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import HeaderHome from '../components/Header/HeaderHome';
import HeaderLogo from '../components/Header/HeaderLogo';
import HeaderConnectIcon from '../components/Header/HeaderConnectIcon';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    padding: theme.spacing(1),
  },
}));

const Header = (props) => {
  const {
    history,
  } = props;
  const classes = useStyles();

  const handleHomeButton = (e) => {
    e.preventDefault(); // event.persist();
    // Need to dispatch action for disconnect user
    if (history) {
      history.push('/');
    }
  };

  return (
    <Grid container alignItems="center" className={classes.rootHeader}>
      <Grid item xs={3} container justify="center">
        <HeaderHome handleOnClick={handleHomeButton} />
      </Grid>
      <Grid item xs={6} container justify="center">
        <HeaderLogo />
      </Grid>
      <Grid item xs={3} container justify="center">
        <HeaderConnectIcon />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Header);
