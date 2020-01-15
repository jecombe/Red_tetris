import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Stage from './Stage';

const GameBoard = (props) => {
  const {
    playerStage,
    playerNextPiece,
    move,
  } = props;

  return (
    <Grid container justify="center" tabIndex="0" onKeyDown={(e) => move(e)} spacing={2}>
      <Grid item xs={6} lg={9} container justify="center" alignItems="center">
        {playerStage && playerStage.length
        && <Stage stage={playerStage} />}
      </Grid>
      <Grid item xs={6} lg={3} container justify="center" style={{ height: '20vh' }}>
        {playerNextPiece && playerNextPiece.length
        && <Stage stage={playerNextPiece} /> }
      </Grid>
    </Grid>
  );
};

GameBoard.propTypes = {
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  move: PropTypes.func.isRequired,
};

export default GameBoard;
