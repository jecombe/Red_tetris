import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';


import socket from '../api';
import * as actions from '../actions';
import Stage from '../components/Game/Stage';
import StageTetro from '../components/Game/StageTetro';
import PrintStageOtherPlayer from '../components/Game/PrintStageOtherPlayer';

import GameStatus from '../components/Game/gameStatus';
import { createStagePiece } from '../../server/stage';

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
    updateStageMallus
  } = props;



  function PrintStage(props) {
    const stage = props;
    if (stage.stage && stage.stage.length) {
      return <Stage stage={stage.stage} />;
    }

    return 0;
  }

  function PrintStagePiece(props) {

    const stage = props;
    if (stage.stage && stage.stage.length) {
      return <StageTetro stage={stage.stage} />;
    }

    return 0;
  
  }
  console.log('GAME PROPS ', props);

  /* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
  if (!playerName || !playerRoom) history.push('/');

  useEffect(() => {
    socket.on('objPlayer', (payload) => {
      appGetStage(payload);
    });

    socket.on('stage', (payload) => {

      console.log('RECIEVE STAGE ', payload)
      // setDropTime(1000)
      // console.log('STAGE ', payload)
      updateStage(payload);
    });
    socket.on('stageMallus', (payload) => {
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
    <div role="button" style={style.GameStyle} tabIndex="0" onKeyDown={(e) => move(e)}>
      <PrintStage stage={playerStage} />
      <PrintStagePiece stage={playerNextPiece}/>
      <GameStatus handleSubmit={handleSubmitStatus} />
      <PrintStageOtherPlayer/>
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
  playerNextPiece: state.player.playerNextPiece
  
});

const mapDispatchToProps = {
  playerStartGame: actions.playerStartGame,
  appGetStage: actions.appGetStage,
  updateStage: actions.updateStage,
  updateStageMallus: actions.updateStageMallus,
  sendPosition: actions.sendPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
