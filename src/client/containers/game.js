import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';
import GameLayout from '../components/Game/GameLayout';

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
    reqStartGame,
    reqSendPosition,
    history,
  } = props;

  /* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
  if (!playerName || !playerRoom) history.push('/');

  const move = ({ keyCode }) => reqSendPosition(keyCode);

  const handleSubmitStatus = () => reqStartGame({ playerName, playerRoom });

  return (
    <GameLayout
      playerStage={playerStage}
      playerNextPiece={playerNextPiece}
      move={move}
      handleSubmitStatus={handleSubmitStatus}
    />
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqSendPosition: actions.reqSendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
