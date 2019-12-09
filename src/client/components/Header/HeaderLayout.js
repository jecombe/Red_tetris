import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

import HeaderLogo from './HeaderLogo';

const useStyles = makeStyles({
  homeIcon: {
    color: 'grey',
    '&:hover': {
      color: 'red',
    },
  },
  connectIcon: {
    color: (props) => (props.connexion ? 'lime' : 'red'),
  },
});

const HeaderLayout = (props) => {
  const { connexion, handleHomeButton } = props;
  const classes = useStyles(connexion);

  return (
    <Grid container alignItems="center">
      <Grid item xs={3} container justify="center">
        <IconButton aria-label="Home" component="span" onClick={handleHomeButton} className={classes.homeIcon}>
          <HomeIcon />
        </IconButton>
      </Grid>
      <Grid item xs={6} container justify="center">
        <HeaderLogo />
      </Grid>
      <Grid item xs={3} container justify="center">
        <FiberManualRecordIcon className={classes.connectIcon} />
      </Grid>
    </Grid>
  );
};

HeaderLayout.propTypes = {
  connexion: PropTypes.bool.isRequired,
  handleHomeButton: PropTypes.func.isRequired,
};

export default HeaderLayout;
