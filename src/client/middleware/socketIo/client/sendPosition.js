import ev from '../../../../shared/events';

export const dispatch = (socket, store, action) => {
  socket.emit(action.type, action.payload);
};

export default {
  action: ev.POSITION_TETRO,
  dispatch,
};
