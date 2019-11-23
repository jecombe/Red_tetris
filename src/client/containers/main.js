import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

import socket from '../api';
import { appConnected, appDisconnected } from '../actions';
import Login from './login';
import Game from './game';

const MainRender = props => {
    if (!props.connexion)
        return <ClipLoader /> ;
    
    return (
        <Switch>
            <Route exact path="/:room[:playerName]" component={Game} />
            <Route path="/" component={Login} />
        </Switch>
    );
}

const Main = props => {
	socket.on('connect', props.appConnected);
	socket.on('disconnect', props.appDisconnected);

    return (
        <div>
            <MainRender connexion={props.connexion} />
        </div>
    );
}

const mapStateToProps = state => ({
    connexion: state.app.connexion,
});

const mapDispatchToProps = {
    appConnected,
    appDisconnected
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);