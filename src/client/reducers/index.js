import { combineReducers } from 'redux';

import rooms from './rooms';
import player from './player';

const rootReducer = combineReducers({
  rooms,
  player
});

export default rootReducer;