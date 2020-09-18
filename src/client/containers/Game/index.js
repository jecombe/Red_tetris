import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameSettingsConnect from './GameSettingsConnect';
import GameChatConnect from './GameChatConnect';
import GameBoardConnect from './GameBoardConnect';
import GamePlayersConnect from './GamePlayersConnect';

const getRoom = (pathname) => pathname.split('/')[1].split('[')[0].trim();

const getName = (pathname) => pathname.split('/')[1].split('[')[1].split(']')[0].trim();

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    reqLogin,
    history,
  } = props;

  // if (!playerName || !playerRoom) history.push('/');
  if (!playerName || !playerRoom) {
    const room = getRoom(history.location.pathname);
    const name = getName(history.location.pathname);

    if (!room || !name) history.push('/');

    reqLogin({
      playerName: name,
      playerRoom: room,
    });
  }

  return (
    <Grid container justify="space-around">
      <Grid item xs={12} lg={3} container spacing={2} justify="center" style={{ height: '75vh' }}>
        <Grid item xs={12}>
          <GameSettingsConnect />
        </Grid>
        <Grid item xs={12}>
          <GameChatConnect />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} style={{ height: '75vh' }}>
        <GameBoardConnect />
      </Grid>
      <Grid item xs={12} lg={4} style={{ height: '75vh' }}>
        <GamePlayersConnect />
      </Grid>
    </Grid>
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  reqLogin: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
});

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
