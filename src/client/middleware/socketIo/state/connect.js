/* eslint-disable no-unused-vars */
import ev from '../../../../shared/events';

const action = 'connect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const type = ev.SOCKET_CONNECT;
  const payload = {
    connected: true,
    host: action.payload.host,
    port: action.payload.port,
  };
  console.info('Socket connected.');
  store.dispatch({ type, payload });
};

export default {
  action,
  dispatch,
};
