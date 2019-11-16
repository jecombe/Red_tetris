import { combineReducers } from 'redux';

import alert from './alert';
import game from './game';
import user from './user';

const rootReducer = combineReducers({
  alert,
  game,
  user
});

export default rootReducer;