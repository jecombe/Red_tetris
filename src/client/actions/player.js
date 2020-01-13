import ev from '../../shared/events';

/*
 * action creators for client socket event
 */

export const reqSendPosition = (payload) => ({
  type: ev.POSITION_TETRO,
  payload: {
    keyCode: payload.keyCode,
  },
});

export const reqStartGame = (payload) => ({
  type: ev.START_GAME,
  payload: {
    playerName: payload.playerName,
    playerRoom: payload.playerRoom,
  },
});

export const resObjPlayer = (payload) => ({
  type: ev.OBJ_PLAYER,
  payload: {
    playerStage: payload.playerStage,
    playerNextPiece: payload.playerNextPiece,
    playerOtherStage: payload.playerOtherStage,
    playerOwner: payload.playerOwner,
  },
});

export const updateStage = (payload) => ({

  type: ev.STAGE,
  payload: {
    playerStage: payload.newStage,
    playerNextPiece: payload.nextPiece,
    playerGameOver: payload.gameOver,
    otherNotLosing: payload.otherNotLosing,
    playerLineFull: payload.playerLineFull,
  },
});

export const updateStageMallus = (payload) => ({
  type: ev.STAGE_MALLUS,
  payload: {
    stage: payload.newStage,
  },
});

export const updateOtherStage = (payload) => ({
  type: ev.STAGE_OTHER,
  payload: {
    playerOtherStage: payload.otherStage,
    otherNotLosing: payload.otherNotLosing,
    playerWin: payload.playerWin,
    playerOwner: payload.playerOwner,

  },
});
