import * as socket from './socket';
import * as login from './login';
import * as game from './game';
import * as chat from './chat';

export default {
    ...socket,
    ...login,
    ...game,
    ...chat
};
