import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log('res', data)
    dispatch({
        type: ev.res_UPDATE_COLLISION,
        payload: data,
    });
};

export default {
  action: ev.res_UPDATE_COLLISION,
  dispatch,
};