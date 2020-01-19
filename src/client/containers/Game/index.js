import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import actions from '../../actions';

import GameSettingsConnect from './GameSettingsConnect';
import GameBoardConnect from './GameBoardConnect';
import GamePlayersConnect from './GamePlayersConnect';
import GameChatConnect from './GameChatConnect';

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    otherNotLosing,
    playerWin,
    playerLineFull,
    reqLogin,
    history,
  } = props;

  if (!playerName || !playerRoom) {
    const room = history.location.pathname.split('/')[1].split('[')[0].trim();
    const name = history.location.pathname.split('/')[1].split('[')[1].split(']')[0].trim();

    if (!room || !name) history.push('/');

    reqLogin({
      playerName: name,
      playerRoom: room,
    });
  }

  if (otherNotLosing === 0) {
    console.log('END GAME', otherNotLosing, 'IS WINNER ?', playerWin);
  }
  console.log('LINE FULL:', playerLineFull);

  return (
    <Paper>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={4} container>
          <Grid item xs={12}>
            <GameSettingsConnect />
          </Grid>
          <Grid item xs={12}>
            <GameChatConnect />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <GameBoardConnect />
        </Grid>
        <Grid item xs={12} lg={4}>
          <GamePlayersConnect />
        </Grid>
      </Grid>
    </Paper>
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  otherNotLosing: PropTypes.number.isRequired,
  playerWin: PropTypes.bool.isRequired,
  playerLineFull: PropTypes.number.isRequired,
  reqLogin: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  otherNotLosing: state.player.otherNotLosing,
  playerWin: state.player.playerWin,
  playerLineFull: state.player.playerLineFull,
});

const mapDispatchToProps = {
  reqLogin: actions.app.reqLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
