import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log('okokokokokokokokokokokokokoko');
  dispatch({
    type: ev.STAGE_OTHER,
    payload: {
      playerOtherStage: data.otherStage,
    },
  });
};

export default {
  action: ev.STAGE_OTHER,
  dispatch,
};
