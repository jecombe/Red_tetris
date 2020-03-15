import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.STAGE,
    payload: {
      playerStage: data.newStage,
      playerNextPiece: data.nextPiece,
      playerGameOver: data.gameOver,
      otherNotLosing: data.otherNotLosing,
      playerLineFull: data.playerLineFull,
      position: data.position,
      collided: data.collided,
      piece: data.piece,
    },
  });
};

export default {
  action: ev.STAGE,
  dispatch,
};
