import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';

import params from '../../shared/params';
import actions from '../actions';

import Header from './Header';
import Login from './Login';
import Game from './Game';
import Footer from './Footer';

import Loader from '../components/Loader';
import Error404 from '../components/Error404';

const App = (props) => {
  const { connected, isLoading, clientConnect } = props;
  const { host, port } = params.server;

  useEffect(() => {
    if (!connected) {
      clientConnect({ host, port });
    }
  });

  return (
    <Grid container direction="column" justify="space-between" style={{ height: '100vh', width: '100vw', backgroundColor: '#ecf0f1' }}>
      <CssBaseline />
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container>
          { connected === false || isLoading === true
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
  isLoading: PropTypes.bool.isRequired,
  clientConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = {
  clientConnect: actions.app.socketConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
