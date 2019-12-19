import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import params from '../../shared/params';
import * as actions from '../actions';

import Header from './header';
import Main from './main';
import Footer from './footer';

const App = (props) => {
  const { host, port } = params.server;

  useEffect(() => {
    props.dispatch(actions.CLIENT_CONNECT({ host, port }));
  });

  return (
    <Container>
      <Grid container direction="column" justify="space-between" style={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Main />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
