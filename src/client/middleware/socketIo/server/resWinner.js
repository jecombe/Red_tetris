import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log("???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/", data)
    dispatch({
        type: ev.WINNER,
        payload: data,
    });
};

export default {
  action: ev.WINNER,
  dispatch,
};