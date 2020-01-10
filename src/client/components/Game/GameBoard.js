import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Stage from './Stage';
import GameStatus from './GameStatus';

const GameBoard = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
    playerOwner,
    playerGameOver,
    reqStartGame,
    reqSendPosition,
  } = props;

  const move = ({ keyCode }) => {
    if (playerGameOver === false) {
      reqSendPosition({ keyCode });
    }
  };

  const handleSubmitStatus = () => reqStartGame({ playerName, playerRoom });

  return (
    <Grid container justify="center" style={{ border: '1px solid black' }} onKeyDown={(e) => move(e)} tabIndex="0">
      <Grid item xs={6} lg={9} container justify="center" alignItems="center" style={{ border: '1px solid black' }}>
        {playerStage && playerStage.length
        && <Stage tabIndex="0" stage={playerStage} />}
      </Grid>
      <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh', border: '1px solid black' }}>
        {playerNextPiece && playerNextPiece.length
        && <Stage stage={playerNextPiece} /> }
        {playerOwner ? (
          <GameStatus handleSubmit={handleSubmitStatus} />
        ) : (0)}
      </Grid>
    </Grid>
  );
};

GameBoard.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerOwner: PropTypes.bool.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
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
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqSendPosition: actions.reqSendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
