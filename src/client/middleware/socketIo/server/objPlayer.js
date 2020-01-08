import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.OBJ_PLAYER,
    payload: {
      playerStage: data.playerStage,
      playerNextPiece: data.playerNextPiece,
      playerOtherStage: data.playerOtherStage,
      playerOwner: data.playerOwner,
    },
  });
};

export default {
  action: ev.OBJ_PLAYER,
  dispatch,
};
