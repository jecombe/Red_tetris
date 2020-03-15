import React from 'react';
import PropTypes from 'prop-types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  connectIcon: (props) => ({
    color: props.connected ? 'lime' : 'red',
  }),
});

const HeaderState = (props) => {
  const { connected } = props;
  const classes = useStyles({ connected });

  return (
    <FiberManualRecordIcon fontSize="small" className={classes.connectIcon} />
  );
};

HeaderState.propTypes = {
  connected: PropTypes.bool.isRequired,
};

export default HeaderState;
