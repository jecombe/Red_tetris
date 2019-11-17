import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from '../api';
import { store } from '../store';

import { justJoined, appendMessage } from '../actions';

import GameStatus from '../components/gameStatus';
import GameBoard from '../components/gameBoard';

const Game = (props, test) => {
	const [handle, setHandle] = useState('');
	const [textarea, setTextarea] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = (handle, message) => {
		// console.log("Called");
		if (handle === '' || message === '') {
			setError('Handle or message should not be null');
			return;
		}
		setError('');

	};

	const handleSubmitStatus = () => {
		console.log("Status reached");
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
			<GameBoard handleSubmit={handleSubmitBoard} />
		</div>
	);
};

const mapStateToProps = (state) => {

	console.log('state print', state)

	const { joined, roomList } = state.user;

	return {
		joined,
		roomList
	};
};

export default connect(mapStateToProps)(Game);


