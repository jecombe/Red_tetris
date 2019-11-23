import { combineReducers } from 'redux';

import app from './app';
import player from './player';

const rootReducer = combineReducers({
  app,
  player
});

export default rootReducer;