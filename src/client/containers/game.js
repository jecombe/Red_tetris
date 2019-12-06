import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from '../api';
import { store } from '../store';
import Stage from '../components/Stage';
import {
  playerStartGame, appGetStage, updateStage, sendPosition,
} from '../actions';


import GameStatus from '../components/gameStatus';
import { useInterval } from '../hooks/useInterval';


const Game = (props, test) => {
  const [dropTime, setDropTime] = useState(null);


  function PrintStage(props) {
    const stage = props;
    if (stage.stage && stage.stage.length) {
		  return <Stage stage={stage.stage} />;
    }

    return 0;
	  }


  console.log('GAME PROPS ', props);

  /* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
  if (!props.playerName || !props.playerRoom) props.history.push('/');

  useEffect(() => {
    socket.on('objPlayer', (payload) => {
      props.appGetStage(payload);
	  });

	  socket.on('stage', (payload) => {
      // setDropTime(1000)
      // console.log('STAGE ', payload)
      props.updateStage(payload);
    });
  }, []);


	 const move = ({ keyCode }) => {
		 props.sendPosition(keyCode);
	 };

  const handleSubmitStatus = () => {
    props.playerStartGame({
      playerName: props.state.player.playerName,
      playerRoom: props.state.player.playerRoom,
		  });
  };


  /* useInterval(() => {
		props.sendPosition(40)
	  }, dropTime); */

  return (
    <div style={style.GameStyle} tabIndex="0" onKeyDown={(e) => move(e)}>
      <PrintStage stage={props.state.player.playerStage} />
      <GameStatus handleSubmit={handleSubmitStatus} />
    </div>
  );
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
  state,
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
});

const mapDispatchToProps = {
  playerStartGame,
  appGetStage,
  updateStage,
  sendPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
