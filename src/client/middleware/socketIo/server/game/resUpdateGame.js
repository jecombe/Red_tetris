import ev from '../../../../../shared/events';

import actions from '../../../../actions';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch(actions.updateGame({ game: payload.game }));
  }
};

export default {
  action: ev.res_UPDATE_GAME,
  dispatch,
};
