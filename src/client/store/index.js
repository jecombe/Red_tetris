import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import socketIOEmitterMiddleware from 'socket.io-emitter-middleware';
import socket from '../api/index';
import rootReducer from '../reducers';
import { storeStateMiddleWare } from '../middleware/storeStateMiddleWare';

const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketIOEmitterMiddleware(socket),
      logger,
    ),
  ),
);

export default store;
