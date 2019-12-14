/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';

const action = 'disconnect';
// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const payload = {
    connexion: false,
  };
  store.dispatch(actions.appStatus(payload));
};

export default {
  action,
  dispatch,
};
