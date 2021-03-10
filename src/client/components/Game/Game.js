import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import GameRoomContainer from '../../containers/Game/GameRoomContainer';
import GameBoardContainer from '../../containers/Game/GameBoardContainer';
import GameChatContainer from '../../containers/Game/GameChatContainer';

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
  },
  card: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  game: {
    height: '97%',
  },
  gridItem: {
    height: '100%',
    width: '100%',
  },
});

const Game = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {/* <Grid container justify="center" alignItems="center" className={classes.grid}> */}
      <Grid container spacing={2} alignItems="center" justify="center" className={classes.gridItem}>
        <Grid item sm={12} md className={classes.game}>
          <GameRoomContainer />
        </Grid>
        <Grid item sm={6} md={4} className={classes.game}>
          <GameBoardContainer />
        </Grid>
        <Grid item sm={6} md>
          <GameChatContainer className={classes.game} />
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Container>
  );
};

export default Game;
