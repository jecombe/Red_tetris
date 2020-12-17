import { push } from 'connected-react-router';

import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: 'login: Succed',
          variant: 'success',
        },
        name: payload.name,
        room: payload.room,
      },
    });

    dispatch(push(`/${payload.room}[${payload.name}]`));
  } else {
    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: 'login: Failed',
          variant: 'error',
        },
        name: payload.name,
        room: payload.room,
      },
    });

    dispatch(push('/'));
  }

  // dispatch({
  //   type: ev.UPDATE_PLAYER_LOG,
  //   payload: { name: payload.name },
  // });

  // dispatch({
  //   type: ev.UPDATE_ROOM_LOG,
  //   payload: { room: payload.room },
  // });
};

export default {
  action: ev.res_LOGIN,
  dispatch,
};
