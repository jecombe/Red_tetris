import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameBoard from '../../components/Game/GameBoard';

const GameBoardConnect = (props) => {
  const {
    playerOwner,
    playerDropTime,
  } = props;

  return (
    <GameBoard props={props} />
  );
};

GameBoardConnect.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerOwner: PropTypes.bool.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  otherNotLosing: PropTypes.number.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
  playerOwner: state.player.playerOwner,
  playerGameOver: state.player.playerGameOver,
  otherNotLosing: state.player.otherNotLosing,
  playerDropTime: state.player.playerDropTime,
});

const mapDispatchToProps = {
  reqStartGame: actions.player.reqStartGame,
  reqSendPosition: actions.player.reqSendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardConnect);
