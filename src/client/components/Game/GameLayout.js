import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Stage from './Stage';

import GameBoard from './GameBoard';
import GamePlayers from './GamePlayers';

import infos from './infosHelper';

const useStyles = makeStyles((theme) => ({
  rootGame: {
    padding: theme.spacing(3, 3),
  },
}));

const GameLayout = (props) => {
  const {
    playerStage,
    playerOtherStage,
    playerNextPiece,
    move,
    handleSubmitStatus,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} lg={7}>
        <GameBoard
          playerStage={playerStage}
          playerNextPiece={playerNextPiece}
          handleSubmitStatus={handleSubmitStatus}
        />
      </Grid>
      <Grid item xs={12} lg={5} container alignItems="center" justify="center">
        <GamePlayers infos={infos} playerOtherStage={playerOtherStage} />
      </Grid>
    </Grid>
  );
};

GameLayout.propTypes = {
  playerStage: PropTypes.array.isRequired,
  playerNextPiece: PropTypes.array.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  handleSubmitStatus: PropTypes.func.isRequired,
};

export default GameLayout;
