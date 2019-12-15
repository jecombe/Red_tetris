/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';

const action = 'disconnect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const type = actions.APP_STATE;
  const payload = {
    connected: false,
  };

  console.warn('Disconnecting...');
  store.dispatch({ type, payload });
};

export default {
  action,
  dispatch,
};
