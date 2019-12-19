import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from './login';
import Game from './game';
import Loader from '../components/Loader';
import Error404 from '../components/Error404';
import { appStatePropTypes } from '../reducers/app';
import Grid from '@material-ui/core/Grid';

const Main = (props) => {
  const { app } = props;
  const { connected } = app;

  // eslint-disable-next-line no-shadow
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
