import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  connectIcon: (props) => ({
    color: props.connected ? 'lime' : 'red',
  }),
});

const HeaderConnectIcon = (props) => {
  const { connected } = props;
  const classes = useStyles({ connected });

  return (
    <FiberManualRecordIcon fontSize="small" className={classes.connectIcon} />
  );
};

HeaderConnectIcon.propTypes = {
  connected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

export default connect(mapStateToProps)(HeaderConnectIcon);
