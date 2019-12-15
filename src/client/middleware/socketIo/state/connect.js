/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';

const action = 'connect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const type = actions.APP_STATE;
  const payload = {
    connected: true,
  };

  console.log('Connecting...');
  store.dispatch({ type, payload });
};

export default {
  action,
  dispatch,
};
