import ev from '../../../../shared/events';
import * as actions from '../../../actions';

export const dispatch = (socket, store, action) => {
  // dispatch an action with the store to the server
  socket.emit(action.type, action.payload);
};

export default {
  action: actions.PLAYER_LOGIN_ENTER_GAME,
  dispatch,
};
