import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { BlockLoading } from 'react-loadingg';

import Stage from './Stage';
import { useInterval } from '../../helpers/gameHelpers';

const GameBoard = (props) => {
  const {
    playerStage,
    playerNextPiece,
    playerGameOver,
    playerDropTime,
    playerWin,
    move,
  } = props;

  /* TIMER DROP */
  useInterval(() => {
    if (playerGameOver === false && playerWin === false) move({ keyCode: 40 });
  }, playerDropTime);

  return (
    <Grid container justify="center" onKeyDown={(e) => move(e)} tabIndex="0">
      {playerStage && playerStage.length ? (
        <Grid item xs={6} lg={9} container justify="center" alignItems="center">
          <Stage tabIndex="0" stage={playerStage} />
        </Grid>
      ) : <BlockLoading />}
      {playerNextPiece && playerNextPiece.length ? (
        <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
          <Stage stage={playerNextPiece} />
        </Grid>
      ) : <BlockLoading />}
    </Grid>
  );
};

GameBoard.propTypes = {
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  playerWin: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
};

export default GameBoard;
