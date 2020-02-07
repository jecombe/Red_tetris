import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log("=====================++> 222 ", data.actualPiece)

  dispatch({
    type: ev.STAGE,
    payload: {
      playerStage: data.newStage,
      playerNextPiece: data.nextPiece,
      playerGameOver: data.gameOver,
      otherNotLosing: data.otherNotLosing,
      playerLineFull: data.playerLineFull,
      actualPiece: data.actualPiece,
      pos: data.pos
    },
  });
};

export default {
  action: ev.STAGE,
  dispatch,
};
