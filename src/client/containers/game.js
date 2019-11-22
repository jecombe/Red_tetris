import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from '../api';
import { store } from '../store';
import Stage from '../components/Stage'
import { justJoined, appendMessage } from '../actions';

import GameStatus from '../components/gameStatus';
import GameBoard from '../components/gameBoard';

const Game = (props, test) => {
	const [handle, setHandle] = useState('');
	const [textarea, setTextarea] = useState('');
	const [error, setError] = useState(null);


	const handleSubmitStatus = () => {
		console.log("Status reached", props);

		socket.emit('startGame', {
			username: props.state.player.playerName,
			room: props.state.player.playerRoom
		  });

	};

	const handleSubmitBoard = () => {
		console.log("Board reached");
	};

	return (
		<div style={style.GameStyle}>
			<Stage stage={props.state.player.playerStage} />
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

const mapStateToProps = (state) => {

	console.log('state print', state)

	//const { joined, roomList } = state.user;

	return {
		state
		//joined,
		//roomList
	};
};

export default connect(mapStateToProps)(Game);


