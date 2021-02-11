import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import rootReducer from '../reducers';
import socketIoMiddleware from '../middleware/socketIoMiddleware';

export const history = createHashHistory();

const logger = createLogger();

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      socketIoMiddleware,
      logger,
    ),
  ),
);

export default store;
