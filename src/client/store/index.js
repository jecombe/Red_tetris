import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare';

const logger = createLogger();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            storeStateMiddleWare,
            thunk,
            logger
        )
    )
);

export default store;