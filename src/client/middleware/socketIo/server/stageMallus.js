import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.STAGE_MALLUS,
    payload: {
      playerStage: data.stage,
    },
  });
};

export default {
  action: ev.STAGE_MALLUS,
  dispatch,
};
