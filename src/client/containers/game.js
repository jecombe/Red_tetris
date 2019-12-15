import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';
import GameLayout from '../components/Game/GameLayout';
import { playerStatePropTypes } from '../reducers/player';

const Game = (props) => {
  const {
    player,
    reqStartGame,
    reqSendPosition,
    history,
  } = props;
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
  } = player;

  if (!playerName || !playerRoom) {
    history.push('/');
  }

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
  player: playerStatePropTypes.isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqSendPosition: actions.reqSendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
