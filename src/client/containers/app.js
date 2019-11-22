import React from 'react';
import { Route } from 'react-router-dom'

import Header from './header';
import Login from './login';
import Game from './game';

function App() {
	return (
	<div style={style.appStyle}>
		<div style={style.headerStyle}>
			<Header />
		</div>
		<div style={style.bodyStyle}>
			<Route exact path="/" component={Login} />
			<Route exact path="/:room[:playerName]" component={Game} />
		</div>
    </div>
  );
}

const style = {
	appStyle: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	headerStyle: {
   		width: '100%'
	},
	bodyStyle: {
  		width: '100%'
	}
}

export default App;
