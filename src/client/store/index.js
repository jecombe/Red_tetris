import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import socketIOEmitterMiddleware from 'socket.io-emitter-middleware';

import * as socket from '../api';
import rootReducer from '../reducers';
import { storeStateMiddleWare } from '../middleware/storeStateMiddleWare';
import socketIoMiddleware from '../middleware/socketIoMiddleware';

const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketIoMiddleware,
      logger,
    ),
  ),
);

store.dispatch({ type: 'CLIENT_CONNECT', payload: { host: 'localhost', port: 3000 } });

export default store;
