import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  connectIcon: (props) => ({
    color: props.colorState,
  }),
});

const HeaderConnectBox = (props) => {
  const { socketState, loggedState, colorState } = props;
  const classes = useStyles({ colorState });

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={3} container justify="center" alignItems="center">
        <FiberManualRecordIcon fontSize="small" className={classes.connectIcon} />
        <Typography color="initial">
          {socketState}
        </Typography>
      </Grid>
      <Grid item xs={5} container justify="center" alignItems="center">
        <Typography color="initial">
          {loggedState}
        </Typography>
      </Grid>

    </Grid>
  );
};

HeaderConnectBox.propTypes = {
  socketState: PropTypes.string.isRequired,
  loggedState: PropTypes.string.isRequired,
  colorState: PropTypes.string.isRequired,
};


export default HeaderConnectBox;
