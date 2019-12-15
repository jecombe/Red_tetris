import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
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

export default store;
