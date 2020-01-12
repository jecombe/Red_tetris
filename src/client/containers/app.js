import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import params from '../../shared/params';
import * as actions from '../actions';

import Header from './Header';
import Login from './Login';
import Game from './Game';
import Footer from './Footer';

import Loader from '../components/Loader';
import Error404 from '../components/Error404';

const App = (props) => {
  const { connected, clientConnect } = props;
  const { host, port } = params.server;

  useEffect(() => {
    clientConnect({ host, port });
  });

  return (
    <Grid container direction="column" justify="space-between" style={{ height: '100vh' }}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container>
          { !connected
            ? <Loader />
            : (
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/:room[:playerName]" component={Game} />
                <Route component={Error404} />
              </Switch>
            )}
        </Container>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  clientConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

const mapDispatchToProps = {
  clientConnect: actions.CLIENT_CONNECT,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
