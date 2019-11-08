import React from 'react';
import { connect } from 'react-redux';
import Connexion from '../components/Connexion';
import { Route, Switch } from 'react-router-dom'
import Tetris from '../components/Tetris';

function App() {


  return (
    <div className="App">

    <Route exact path="/" component={Connexion} />
    <Route exact path="/:room[:playerName]" component={Tetris} />

    </div>
  );
}
const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, null)(App);
