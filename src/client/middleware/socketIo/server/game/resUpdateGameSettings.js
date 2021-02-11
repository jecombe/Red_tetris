import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { settings } = data;

  dispatch({
    type: ev.UPDATE_GAME_SETTINGS,
    payload: { settings },
  });
};

export default {
  action: ev.res_UPDATE_GAME_SETTINGS,
  dispatch,
};
