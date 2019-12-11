import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';

import * as socket from '../api';
import * as actions from '../actions';
import Stage from '../components/Game/Stage';
import StageTetro from '../components/Game/StageTetro';

import GameStatus from '../components/Game/gameStatus';

const Game = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    history,
    appGetStage,
    updateStage,
    sendPosition,
    playerStartGame,
    playerNextPiece,
    updateStageMallus,
  } = props;

  function PrintStage({ stage }) {
    if (stage && stage.length) {
      return <Stage stage={stage} />;
    }

    return 0;
  }

  function PrintStagePiece({ stage }) {
    if (stage && stage.length) {
      return <StageTetro stage={stage} />;
    }

    return 0;
  }

  /* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
  if (!playerName || !playerRoom) history.push('/');

  useEffect(() => {
    socket.client.on('objPlayer', (payload) => {
      appGetStage(payload);
    });

    socket.client.on('stage', (payload) => {
      // setDropTime(1000)
      // console.log('STAGE ', payload)
      updateStage(payload);
    });

    socket.client.on('stageMallus', (payload) => {
      console.log('OKOKOKOKOKOKOKOKOOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKO ', payload);
      // setDropTime(1000)
      // console.log('STAGE ', payload)
      updateStageMallus(payload);
    });
  }, []);

  const move = ({ keyCode }) => {
    sendPosition(keyCode);
  };

  const handleSubmitStatus = () => {
    playerStartGame({
      playerName,
      playerRoom,
    });
  };

  return (
    <Card style={style.GameStyle} onKeyDown={(e) => move(e)}>
      <PrintStage tabIndex="0" stage={playerStage} />
      <PrintStagePiece stage={playerNextPiece} />
      <GameStatus handleSubmit={handleSubmitStatus} />
    </Card>
  );
};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  playerStartGame: PropTypes.func.isRequired,
  sendPosition: PropTypes.func.isRequired,
  updateStage: PropTypes.func.isRequired,
  updateStageMallus: PropTypes.func.isRequired,
  appGetStage: PropTypes.func.isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const style = {
  GameStyle: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
  },
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
});

const mapDispatchToProps = {
  playerStartGame: actions.playerStartGame,
  appGetStage: actions.appGetStage,
  updateStage: actions.updateStage,
  updateStageMallus: actions.updateStageMallus,
  sendPosition: actions.sendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
