import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from '../api';
import { store } from '../store';
import Stage from '../components/Stage'
import { justJoined, appendMessage } from '../actions';
import { playerStartGame, appGetStage, appGetPieceStart, updateStage } from '../actions';

import { usePlayer } from '../hooks/usePlayer';

import GameStatus from '../components/gameStatus';
import GameBoard from '../components/gameBoard';



const Game = (props, test) => {

	//const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(props);


	function PrintStage(props) {
		const stage = props;
		if (stage.stage && stage.stage.length) {

		  return <Stage stage={stage.stage} />
		}

		return 0
	  }

	  
	console.log('GAME PROPS ', props)
	const [piece, setPiece] = useState([]);

	/* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
	if (!props.playerName || !props.playerRoom) props.history.push("/");



   useEffect(() => {

	socket.on('objPlayer', payload => {
		props.appGetStage(payload);
	  });

	  socket.on('pieceStart', payload => {
		  console.log('PIECE START ' ,payload)
		  props.appGetPieceStart(payload);
		  //resetPlayer(payload.form)

	  });
	  socket.on('stage', payload => {
		console.log('NEW STAGE ' ,payload)
		props.updateStage(payload);
		//resetPlayer(payload.form)

	});
	  

	 
   }, []);

	const handleSubmitStatus = () => {
		props.playerStartGame({
			playerName: props.state.player.playerName,
			playerRoom: props.state.player.playerRoom
		  });

	

	};

	const handleSubmitBoard = () => {
		console.log("Board reached");
	};

	return (
		<div style={style.GameStyle}>
			{console.log('PIECE RENDER ', piece)}
	<PrintStage stage={props.state.player.playerStage}/>
			<GameStatus handleSubmit={handleSubmitStatus} />
		</div>
	);
};

			// <div>
			// 	{props.joined ? <em>You are connected</em> : <em >dont't connect</em>}
			// </div>
const style = {
	GameStyle: {
		display: 'flex',
		flexGrow: '1',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100vw'
	}
}

  
const mapStateToProps = (state) => ({
	state: state,
	playerName: state.player.playerName,
	playerRoom: state.player.playerRoom
});

const mapDispatchToProps = {
	//playerLogin,
	playerStartGame,
	appGetStage,
	appGetPieceStart,
	updateStage

	
  }

export default connect(mapStateToProps, mapDispatchToProps)(Game);


