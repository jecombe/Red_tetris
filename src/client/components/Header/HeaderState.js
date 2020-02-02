import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  connectIcon: (props) => ({
    color: props.connected ? 'lime' : 'red',
    fontSize: 15,
    marginRight: 5,
  }),
});

const HeaderState = (props) => {
  const {
    connected,
    host,
    port,
  } = props;
  const classes = useStyles({ connected });

  return (
    <Grid container justify="center" alignItems="center">
      <FiberManualRecordIcon
        className={classes.connectIcon}
      />
      <Typography variant="caption" color="initial">
        { connected ? `[${host}:${port}]` : 'Offline'}
      </Typography>
    </Grid>
  );
};

HeaderState.propTypes = {
  connected: PropTypes.bool.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
};

export default HeaderState;
