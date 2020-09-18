import React from 'react';
import PropTypes from 'prop-types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  connectIcon: (props) => ({
    color: props.connected ? 'lime' : 'red',
  }),
});

const HeaderState = (props) => {
  const { connected, nbRooms } = props;
  const classes = useStyles({ connected });

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={4}>
        <Typography>
          {`${nbRooms} rooms`}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          0 players
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FiberManualRecordIcon fontSize="small" className={classes.connectIcon} />
      </Grid>
    </Grid>
  );
};

HeaderState.propTypes = {
  connected: PropTypes.bool.isRequired,
};

export default HeaderState;
