import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.res_ROOMS,
    payload: data,
  });
};

export default {
  action: ev.res_ROOMS,
  dispatch,
};
