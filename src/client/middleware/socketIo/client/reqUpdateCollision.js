import ev from '../../../../shared/events';

export const dispatch = (socket, store, action) => {
  console.log(action);
  socket.emit(action.type, action.payload);
};

export default {
  action: ev.req_UPDATE_COLLISION,
  dispatch,
};
