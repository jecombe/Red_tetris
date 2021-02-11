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
    width: '75%',
  },
  card: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  game: {
    height: '100%',
  },
  gridItem: {
    height: '95%',
    width: '100%',
  },
});

const Game = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <Grid
          item
          container
          justify="space-evenly"
          className={classes.gridItem}
        >
          <Grid item xs={3}>
            <GameRoomContainer />
          </Grid>
          {/* <Divider orientation="vertical" variant="middle" /> */}
          <Grid item xs={5}>
            <GameBoardContainer />
          </Grid>
          {/* <Divider orientation="vertical" variant="middle" /> */}
          <Grid item xs={3}>
            <GameChatContainer />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
