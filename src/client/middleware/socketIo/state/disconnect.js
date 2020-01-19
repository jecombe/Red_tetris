/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = 'disconnect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const type = ev.SOCKET_DISCONNECT;
  const payload = {
    connected: false,
  };

  console.info('Socket disconnected.');
  store.dispatch({ type, payload });
};

export default {
  action,
  dispatch,
};
