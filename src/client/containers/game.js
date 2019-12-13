import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import ev from '../../shared/events';
// import * as socket from '../api';
import * as actions from '../actions';

import GameLayout from '../components/Game/GameLayout';

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    history,
    appGetStage,
    updateStage,
    sendPosition,
    playerStartGame,
    playerNextPiece,
    updateStageMallus,
  } = props;

  /* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
  if (!playerName || !playerRoom) history.push('/');

  useEffect(() => {
    // socket.client.on(ev.OBJ_PLAYER, (payload) => appGetStage(payload));

    // socket.client.on(ev.STAGE, (payload) => updateStage(payload));

    // socket.client.on(ev.STAGE_MALLUS, (payload) => updateStageMallus(payload));
  }, []);

  const move = ({ keyCode }) => {
    sendPosition(keyCode);
  };

  const handleSubmitStatus = () => {
    playerStartGame({
      playerName,
      playerRoom,
    });
  };

  return (
    <GameLayout
      move={move}
      playerStage={playerStage}
      playerNextPiece={playerNextPiece}
      handleSubmitStatus={handleSubmitStatus}
    />
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  playerStartGame: PropTypes.func.isRequired,
  sendPosition: PropTypes.func.isRequired,
  updateStage: PropTypes.func.isRequired,
  updateStageMallus: PropTypes.func.isRequired,
  appGetStage: PropTypes.func.isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
});

const mapDispatchToProps = {
  playerStartGame: actions.playerStartGame,
  appGetStage: actions.appGetStage,
  updateStage: actions.updateStage,
  updateStageMallus: actions.updateStageMallus,
  sendPosition: actions.sendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
