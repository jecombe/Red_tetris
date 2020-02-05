import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameBoard from '../../components/Game/GameBoard';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}

const GameBoardConnect = (props) => {
  const {
    playerRoom,
    playerStage,
    playerNextPiece,
    otherNotLosing,
    playerDropTime,
    playerGameOver,
    reqSendPosition,
  } = props;

  /*useInterval(() => {
    if (otherNotLosing > -1) {
      const keyCode = 40;
      reqSendPosition({ keyCode, playerRoom });
    }
  }, playerDropTime);*/

  const move = ({ keyCode }) => {
    if (playerGameOver === false) {
      reqSendPosition({ keyCode, playerRoom });
    }
  };

  return (
    <GameBoard
      playerStage={playerStage}
      playerNextPiece={playerNextPiece}
      move={move}
    />
  );
};

GameBoardConnect.propTypes = {
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  otherNotLosing: PropTypes.number.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
  playerGameOver: state.player.playerGameOver,
  otherNotLosing: state.player.otherNotLosing,
  playerDropTime: state.player.playerDropTime,
});

const mapDispatchToProps = {
  reqSendPosition: actions.player.reqSendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardConnect);
