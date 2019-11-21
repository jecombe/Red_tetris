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
		<div>
			<div>
				{props.joined ? <em>You are connected</em> : <em >dont't connect</em>}
			</div>
			<GameStatus handleSubmit={handleSubmitStatus} />
			<Stage stage={props.state.player.playerStage} />
		</div>
	);
};

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


