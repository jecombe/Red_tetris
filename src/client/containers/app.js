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
		/* Page 100% height */
		minHeight: '100vh',
		maxHeight: '100vh',

		/* Limit width and center page (*) */
		maxWidth: '770px',
		margin: '0 auto',
	
		/* Align content vertically */
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	headerStyle: {
   /* Extend content width */
   		width: '100%'
	},
	bodyStyle: {
  /* Extend content width */
  width: '100%'
	}
}

export default App;
