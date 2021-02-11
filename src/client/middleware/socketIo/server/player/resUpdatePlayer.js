import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_PLAYER,
      payload: {
        player: payload.player,
      },
    });
  }
};

export default {
  action: ev.res_UPDATE_PLAYER,
  dispatch,
};
