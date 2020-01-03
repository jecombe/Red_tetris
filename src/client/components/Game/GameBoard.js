import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import Stage from './Stage';
import GameStatus from './GameStatus';

const useStyles = makeStyles((theme) => ({
  rootGame: {
    padding: theme.spacing(1),
    width: '100%',
  },
}));

const GameBoard = (props) => {

  const {
    playerStage,
    playerNextPiece,
    handleSubmitStatus,
    playerOwner,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" style={{ border: '1px solid black' }}>
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
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmitStatus: PropTypes.func.isRequired,
};

export default GameBoard;
