import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.STAGE,
    payload: {
      playerStage: data.newStage,
      playerNextPiece: data.nextPiece,
    },
  });
};

export default {
  action: ev.STAGE,
  dispatch,
};
