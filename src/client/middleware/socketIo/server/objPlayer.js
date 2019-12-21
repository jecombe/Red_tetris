import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log('_________________> ', data);
  dispatch({
    type: ev.OBJ_PLAYER,
    payload: {
      playerStage: data.stage,
      playerNextPiece: data.nextPiece,
      playerOtherStage: data.otherStage,
    },
  });
};

export default {
  action: ev.OBJ_PLAYER,
  dispatch,
};
