import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import Header from './header';
import Login from './login';
import Game from './game';

function App() {
	return (
	<div>
		<Header />
		<Route exact path="/" component={Login} />
		<Route exact path="/:room[:playerName]" component={Game} />
    </div>
  );
}

const mapStateToProps = (state) => ({
	playerName: state.user.playerName,
	playerRoom: state.user.playerRoom,
	rooms: state.user.rooms,
});

export default connect(mapStateToProps, null)(App);
