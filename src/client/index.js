import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { composeWithDevTools } from 'redux-devtools-extension';

import io from 'socket.io-client';
import reducer from './reducers';
import App from './containers/app';
import { alert } from './actions/alert';
import { HashRouter } from 'react-router-dom';
import rootReducer from './rootReducer';

const socket = io('http://localhost:3011');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketIoMiddleware))
);



ReactDom.render((
<HashRouter hashType={'noslash'}>
  <Provider store={store}>
    <App />
  </Provider>
  </HashRouter>
), document.getElementById('app'));

