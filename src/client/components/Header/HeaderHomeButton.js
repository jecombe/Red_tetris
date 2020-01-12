import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  homeIcon: {
    color: 'white',
    '&:hover': {
      color: 'red',
    },
  },
});

const HeaderHomeButton = (props) => {
  const { handleOnClick } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <IconButton
        aria-label="Home"
        component="span"
        onClick={handleOnClick}
        className={classes.homeIcon}
      >
        <HomeIcon />
      </IconButton>
    </Grid>
  );
};

HeaderHomeButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default HeaderHomeButton;
