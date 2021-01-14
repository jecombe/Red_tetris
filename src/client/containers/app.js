import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import params from '../../shared/params';
import actions from '../actions';
import Header from '../components/Header/Header';
import Main from './Main';
import Footer from '../components/Footer/Footer';

const App = (props) => {
    const { connected, reqConnect } = props;
    const { host, port } = params.server;

    if (!connected) reqConnect({ host, port });

    return (
        <Grid container direction="column" justify="space-between" style={{ height: '100vh' }}>
            <Grid item style={{ height: '7vh', border: '1px solid red' }}>
                <Header />
            </Grid>
            <Grid item style={{ height: '65vh', border: '1px solid red' }}>
                <Main connected={connected} />
            </Grid>
            <Grid item style={{ height: '5vh', border: '1px solid red' }}>
                <Footer />
            </Grid>
        </Grid>
    );
};

App.propTypes = {
    connected: PropTypes.bool.isRequired,
    reqConnect: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    connected: state.app.connected
});

const mapDispatchToProps = {
    reqConnect: actions.reqConnect
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
