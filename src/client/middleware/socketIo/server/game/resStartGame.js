import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  const { message } = payload;

  // dispatch(actions.updatePlayer({ game }));

  if (status !== 200) {
    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message,
          variant: status === 100 ? 'info' : 'error',
        },
      },
    });
  }
};

export default {
  action: ev.res_START_GAME,
  dispatch,
};
