import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderConnectBox from '../../components/Header/HeaderConnectBox';

const HeaderConnect = (props) => {
  const {
    connected,
    playerName,
  } = props;

  const colorState = (connected === true ? 'lime' : ' red');
  const socketState = (connected === true ? ' Online' : ' Offline');
  const loggedState = (playerName !== null ? `Logged as ${playerName}` : 'Not logged');

  return (
    <HeaderConnectBox
      colorState={colorState}
      socketState={socketState}
      loggedState={loggedState}
    />
  );
};

HeaderConnect.defaultProps = {
  connected: false,
  playerName: '',
};

HeaderConnect.propTypes = {
  connected: PropTypes.bool,
  playerName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
  playerName: state.player.playerName,
});

export default connect(mapStateToProps)(HeaderConnect);
