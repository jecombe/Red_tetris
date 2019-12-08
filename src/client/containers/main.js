import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import socket from '../api';
import * as actions from '../actions';
import Login from './login';
import Game from './game';
import Loader from '../components/Loader';
import Error404 from '../components/Error404';

const Main = (props) => {
  const {
    appConnected,
    appDisconnected,
    connexion,
  } = props;

  socket.on('connect', appConnected);
  socket.on('disconnect', appDisconnected);

  if (!connexion) {
    return (
      <Loader />
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/:room[:playerName]" component={Game} />
      <Route component={Error404} />
    </Switch>
  );
};

Main.propTypes = {
  appConnected: PropTypes.func.isRequired,
  appDisconnected: PropTypes.func.isRequired,
  connexion: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  connexion: state.app.connexion,
});

const mapDispatchToProps = {
  appConnected: actions.appConnected,
  appDisconnected: actions.appDisconnected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
