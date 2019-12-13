import * as actions from '../../../actions';

const action = 'connect';
const dispatch = (socket, store, next, action) => () => {
  store.dispatch(actions.updateAppStatus({ connexion: true }));
};

export default {
  action,
  dispatch,
};
