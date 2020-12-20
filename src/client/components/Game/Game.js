import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// import GameRoom from './GameRoom';
// import GameChat from './GameChat';
import GameBoard from './GameBoard';

import GameRoomContainer from '../../containers/Game/GameRoomContainer';
import GameBoardContainer from '../../containers/Game/GameBoardContainer';
import GameChatContainer from '../../containers/Game/GameChatContainer';

import GameRankingContainer from '../../containers/Game/GameRankingContainer';

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
    // border: '1px solid purple',
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
      {/* <Card variant="outlined" className={classes.card}> */}
      <Grid container justify="center" alignItems="center" className={classes.grid}>
        <Grid item container justify="space-evenly" className={classes.gridItem}>
          <Grid item xs={3}>
            <GameRoomContainer />
          </Grid>
          <Divider orientation="vertical" variant="middle" />
          <Grid item xs={5}>
            <GameBoardContainer />
          </Grid>
          <Divider orientation="vertical" variant="middle" />
          <Grid item xs={3}>
            <GameChatContainer />
          </Grid>
        </Grid>
      </Grid>
      {/* </Card> */}
    </Container>
  );
};

/*
        <Grid container justify="center" alignItems="center" className={classes.game}>
          <Grid item className={classes.gameG}>
            <Grid container justify="space-evenly" alignItems="center" className={classes.game}>
              <Grid item xs={3} className={classes.game}>
                <GameRoomContainer />
              </Grid>
              <Divider orientation="vertical" variant="middle" />
              <Grid item xs={5} className={classes.game}>
                <GameBoardContainer />
              </Grid>
              <Divider orientation="vertical" variant="middle" />
              <Grid item xs={3} className={classes.game}>
                <GameChatContainer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card> */

/* <Container maxWidth="lg" className={classes.container}>
<Grid container className={classes.container} alignItems="center">
  <Grid item style={{ height: '85%' }}>
    <Card variant="outlined">
      <Grid container>
        <Grid item xs={3}>
          <GameRoomContainer />
        </Grid>
        <Divider orientation="vertical" variant="middle" />

        <Grid item xs={3}>
          <GameBoardContainer />
        </Grid>
        <Divider orientation="vertical" variant="middle" />
        <Grid item xs={3}>
          <GameChatContainer />
        </Grid>
      </Grid>
    </Card>
  </Grid>
</Grid>
</Container> */

export default Game;
