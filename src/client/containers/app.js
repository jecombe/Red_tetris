import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import Header from '../components/header';
import Login from './login';
import Game from './game';

function App() {
  return (
    <div>
		<div>
			<Header />
		</div>
		<div>
			<Route exact path="/" component={Login} />
      		<Route exact path="/:room[:playerName]" component={Game} />
		</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, null)(App);
