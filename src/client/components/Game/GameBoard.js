import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Stage from './Stage';

const GameBoard = (props) => {
  const {
    move,
    playerStage,
    playerNextPiece,
  } = props;

  return (
    <Grid>
      <Grid item xs={10} container direction="column" justify="center" alignItems="center">
        {playerStage && playerStage.length
          && <Stage tabIndex="0" stage={playerStage} /> }
      </Grid>
      <Grid item xs={2}>
        {playerNextPiece && playerNextPiece.length
          && <Stage stage={playerNextPiece} /> }
      </Grid>
    </Grid>
  );
};

GameBoard.propTypes = {
  move: PropTypes.func.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameBoard;
