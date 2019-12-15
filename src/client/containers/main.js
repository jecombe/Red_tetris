import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from './login';
import Game from './game';
import Loader from '../components/Loader';
import Error404 from '../components/Error404';
import { appStatePropTypes } from '../reducers/app';

const Main = (props) => {
  const { app } = props;
  const { connected } = app;

  if (!connected) {
    return <Loader />;
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
  app: appStatePropTypes.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default connect(mapStateToProps)(Main);
