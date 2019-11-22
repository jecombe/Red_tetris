import React from 'react';
import { Route } from 'react-router-dom'

import Login from './login';
import Game from './game';

function Main() {
        return (
	<div style={style.MainStyle}>
                <Route exact path="/" component={Login} />
                <Route exact path="/:room[:playerName]" component={Game} />
        </div>
  );
}

const style = {
	MainStyle: {
                border: '1px solid black',
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                width: '100vw'
        }
}

export default Main;