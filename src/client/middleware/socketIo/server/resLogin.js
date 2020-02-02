import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  switch (data.status) {
    case 400: {
      dispatch({
        type: ev.res_LOGIN,
        payload: {
          error: true,
          message: data.message,
          logged: false,
        },
      });
      break;
    }
    default: {
      dispatch({
        type: ev.res_LOGIN,
        payload: {
          error: false,
          message: '',
          logged: true,
        },
      });
    }
  }
};

export default {
  action: ev.res_LOGIN,
  dispatch,
};
