import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Stage from './Stage';
import GameStatus from './GameStatus';
import GamePlayers from './GamePlayers';

import infos from './infosHelper';

const useStyles = makeStyles((theme) => ({
  // gameLayout: {
  //   width: '100vw',
  //   height: '85vh',
  //   margin: theme.spacing(1),
  //   padding: theme.spacing(1),
  // },
}));

const GameLayout = (props) => {
  const {
    playerStage,
    playerNextPiece,
    move,
    handleSubmitStatus,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.gameLayout} onKeyDown={(e) => move(e)}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} lg={7} container>
          <Grid item xs={5} lg={10} container justify="center" alignItems="center">
            {playerStage && playerStage.length
              && <Stage tabIndex="0" stage={playerStage} /> }
          </Grid>
          <Grid item xs={5} lg={2}>
            {playerNextPiece && playerNextPiece.length
              && <Stage stage={playerNextPiece} /> }
            <GameStatus handleSubmit={handleSubmitStatus} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} container alignItems="center" justify="center">
          <GamePlayers infos={infos} />
        </Grid>
      </Grid>
    </Card>
  );
};

GameLayout.propTypes = {
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  move: PropTypes.func.isRequired,
  handleSubmitStatus: PropTypes.func.isRequired,
};

export default GameLayout;
