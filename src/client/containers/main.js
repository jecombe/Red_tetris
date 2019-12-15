import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './login';
import Game from './game';
import Loader from '../components/Loader';
import Error404 from '../components/Error404';

const Main = (props) => {
  const {
    connected,
  } = props;

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
  connected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

export default connect(mapStateToProps)(Main);
