import * as socket from './socket';
import * as login from './login';
import * as game from './game';

export default {
  ...socket,
  ...login,
  ...game,
};
