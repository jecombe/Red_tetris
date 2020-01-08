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
    playerOtherStage,
    playerNextPiece,
    playerGameOver,
    otherNotLosing,
    playerWin,
    playerOwner,
    playerLineFull,
  } = player;

  if (!playerName || !playerRoom) {
    history.push('/');
  }

  const move = ({ keyCode }) => {
    if (playerGameOver === false) {
      reqSendPosition({ keyCode });
    }
  };

  const handleSubmitStatus = () => reqStartGame({ playerName, playerRoom });
  if (otherNotLosing === 0) {
    console.log('END GAME', otherNotLosing, 'IS WINNER ?', playerWin);
  }
  console.log('LINE FULL:', playerLineFull);
  return (
    <div tabIndex="0" onKeyDown={(e) => move(e)}>
      <GameLayout
        playerStage={playerStage}
        playerOtherStage={playerOtherStage}
        playerNextPiece={playerNextPiece}
        handleSubmitStatus={handleSubmitStatus}
        playerOwner={playerOwner}
    
      />
    </div>
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
