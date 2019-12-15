import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
      <CssBaseline />
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
