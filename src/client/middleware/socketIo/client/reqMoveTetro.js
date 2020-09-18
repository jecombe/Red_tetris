import ev from '../../../../shared/events';

export const dispatch = (socket, store, action) => {
  console.log(store, action);

  let payload = { collided: true };

  // action.payload = payload;

  return payload;
};

export default {
  action: ev.req_MOVE_TETRO,
  dispatch,
};
