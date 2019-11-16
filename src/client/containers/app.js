import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import Login from './login';
import Game from './game';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/:room[:playerName]" component={Game} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, null)(App);
