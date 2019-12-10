import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import * as socket from '../api';
import * as actions from '../actions';
import Stage from '../components/Game/Stage';
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
  } = props;

  function PrintStage(props) {
    const stage = props;
    if (stage.stage && stage.stage.length) {
      return <Stage stage={stage.stage} />;
    }

    return 0;
  }


  console.log('GAME PROPS ', props);

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
    <div role="button" style={style.GameStyle} tabIndex="0" onKeyDown={(e) => move(e)}>
      <PrintStage stage={playerStage} />
      <GameStatus handleSubmit={handleSubmitStatus} />
    </div>
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
  appGetStage: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = {
  playerStartGame: actions.playerStartGame,
  appGetStage: actions.appGetStage,
  updateStage: actions.updateStage,
  sendPosition: actions.sendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
