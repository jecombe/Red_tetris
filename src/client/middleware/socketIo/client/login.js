import ev from '../../../../shared/events';

export const dispatch = (socket, store, action) => {
  // dispatch an action with the store to the server
  const payload = {
    username: action.payload.playerName,
    roomActual: action.payload.playerRoom,
  };
  socket.emit(action.type, payload);
};

export default {
  action: ev.req_LOGIN,
  dispatch,
};
