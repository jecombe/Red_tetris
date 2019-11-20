import React from 'react';
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

export default App;
