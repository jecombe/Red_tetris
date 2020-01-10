import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import GameBoard from '../components/Game/GameBoard';
import GamePlayers from '../components/Game/GamePlayers';

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    otherNotLosing,
    playerWin,
    playerLineFull,
    history,
  } = props;

  if (!playerName || !playerRoom) history.push('/');

  if (otherNotLosing === 0) {
    console.log('END GAME', otherNotLosing, 'IS WINNER ?', playerWin);
  }
  console.log('LINE FULL:', playerLineFull);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} lg={7}>
        <GameBoard />
      </Grid>
      <Grid item xs={12} lg={5} container alignItems="center" justify="center">
        <GamePlayers />
      </Grid>
    </Grid>
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  otherNotLosing: PropTypes.number.isRequired,
  playerWin: PropTypes.bool.isRequired,
  playerLineFull: PropTypes.number.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  otherNotLosing: state.player.otherNotLosing,
  playerWin: state.player.playerWin,
  playerLineFull: state.player.playerLineFull,
});

export default connect(mapStateToProps, null)(Game);
