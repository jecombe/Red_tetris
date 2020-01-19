import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameSettings from '../../components/Game/GameSettings';

const GameSettingsConnect = (props) => {
  const {
    playerName,
    playerRoom,
    playerOwner,
    playerDropTime,
    reqStartGame,
  } = props;

  // if game settings need playerName / playerRoom should be moved
  const handleStart = () => reqStartGame({ playerName, playerRoom });
  const handleSettings = () => {
    console.log('Settings handle');
  };

  return (
    <GameSettings
      playerOwner={playerOwner}
      playerDropTime={playerDropTime}
      handleSettings={handleSettings}
      handleStart={handleStart}
    />
  );
};

GameSettingsConnect.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqStartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerOwner: state.player.playerOwner,
  playerDropTime: state.player.playerDropTime,
});

const mapDispatchToProps = {
  reqStartGame: actions.player.reqStartGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSettingsConnect);
