import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

import HeaderLogo from './HeaderLogo';
import { appStatePropTypes } from '../../reducers/app';

const useStyles = makeStyles({
  homeIcon: {
    color: 'grey',
    '&:hover': {
      color: 'red',
    },
  },
  connectIcon: (props) => ({
    color: props.connected ? 'lime' : 'red',
  }),
});

const HeaderLayout = (props) => {
  const {
    app,
    handleHomeButton,
  } = props;
  const { connected } = app;
  const classes = useStyles({ connected });

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={3} container justify="center">
        <IconButton aria-label="Home" component="span" onClick={handleHomeButton} className={classes.homeIcon}>
          <HomeIcon />
        </IconButton>
      </Grid>
      <Grid item xs={6} container justify="center">
        <HeaderLogo />
      </Grid>
      <Grid item xs={3} container justify="center">
        <FiberManualRecordIcon fontSize="small" className={classes.connectIcon} />
      </Grid>
    </Grid>
  );
};

HeaderLayout.propTypes = {
  app: appStatePropTypes.isRequired,
  handleHomeButton: PropTypes.func.isRequired,
};

export default HeaderLayout;
