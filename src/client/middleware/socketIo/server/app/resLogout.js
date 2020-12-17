import { push } from 'connected-react-router';
import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { player, room } = data;

  dispatch(push('/'));

  if (player.name === '' && room.room === '') {
    dispatch(push('/'));

    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: 'logout: Succed',
          variant: 'success',
        },
      },
    });
  } else {
    dispatch(push(`/${room.room}[${player.name}]`));

    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: 'logout: Failed',
          variant: 'error',
        },
      },
    });
  }

  dispatch({
    type: ev.UPDATE_PLAYER_LOGIN,
    payload: { player },
  });

  dispatch({
    type: ev.UPDATE_ROOM_LOGIN,
    payload: { room },
  });

  // dispatch({
  //   type: ev.res_LOGOUT,
  //   payload: {
  //     players,
  //   },
  // });
};

export default {
  action: ev.res_LOGOUT,
  dispatch,
};
