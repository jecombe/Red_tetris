import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import GameSettingsBar from '../../components/Game/GameSettingsBar';

const GameSettings = (props) => {
  const {
    playerOwner,
    playerDropTime,
  } = props;

  return (
    <GameSettingsBar
      playerOwner={playerOwner}
      playerDropTime={playerDropTime}
    />
  );
};

GameSettings.propTypes = {
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerOwner: state.player.playerOwner,
  playerDropTime: state.player.playerDropTime,
});

export default connect(mapStateToProps, null)(GameSettings);
