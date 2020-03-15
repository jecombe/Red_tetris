import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import params from '../../shared/params';
import actions from '../actions';
import Header from './Header';
import Login from './Login';
import Game from './Game';
import Footer from './Footer';
import Loader from '../components/Common/Loader';
import Error404 from '../components/Common/Error404';

const App = (props) => {
  const { connected, isLoading, socketConnect } = props;
  const { host, port } = params.server;

  useEffect(() => {
    if (!connected) socketConnect({ host, port });
  });

  return (
    <Grid container direction="column" justify="space-between" style={{ height: '100vh', backgroundColor: 'skyblue' }}>
      <CssBaseline />
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        { connected === false || isLoading === true
          ? <Loader />
          : (
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/:room[:playerName]" component={Game} />
              <Route component={Error404} />
            </Switch>
          )}
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  socketConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

const mapDispatchToProps = {
  socketConnect: actions.CLIENT_CONNECT,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
