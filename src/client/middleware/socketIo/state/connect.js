/* eslint-disable no-unused-vars */
import ev from '../../../../shared/events';

const action = 'connect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const type = ev.CONNECT;

  console.info('Connecting...');
  store.dispatch({ type });
};

export default {
  action,
  dispatch,
};
