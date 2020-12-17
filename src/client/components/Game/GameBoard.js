import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { createStage } from '../../../shared/stage';
import { playerStatePropTypes, settingsProp } from '../../reducers/reducers.types';

import Stage from '../Common/Stage';
import GameBoardScore from './GameBoard/GameBoardScore';
import GameBoardPieces from './GameBoard/GameBoardPieces';

// import useKeyPress from '../../hooks/useKeyPress';

const useStyles = makeStyles({
  root: {
    height: '100%',
    // width: '100%',
  },
});

const GameBoard = (props) => {
  const {
    player,
    pieces,
  } = props;
  const classes = useStyles();

  return (
    <Card>
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={8}>
          <Stage
            stage={player.stage || createStage()}
          />
        </Grid>
        <Grid item xs={4}>
          <GameBoardPieces
            pieces={pieces}
            nbPiece={player.nbPiece}
          />
          <GameBoardScore
            name={player.name}
            score={player.score}
            level={player.level}
            lines={player.lines}
            rank={player.rank}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

GameBoard.propTypes = {
  player: playerStatePropTypes.isRequired,
  pieces: settingsProp.pieces.isRequired,
};

export default GameBoard;
