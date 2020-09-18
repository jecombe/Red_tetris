import ev from '../../shared/events';

/*
 * action creators for client socket event
 */

export const reqMoveTetro = (payload) => ({
  type: ev.req_MOVE_TETRO,
  payload: {
    keyCode: payload.keyCode,
  },
});

export const updatePosition = (payload) => ({

  type: ev.UPDATE_POSITION,
  payload: {
    x: payload.x,
    y: payload.y,
    playerStage: payload.playerStage,
    piece: payload.piece,
    collided: payload.collided,
    playerGameOver: payload.playerGameOver,
  },
});

export const updateCollision = (payload) => ({
  type: ev.req_UPDATE_COLLISION,
  payload: {
    playerStage: payload.playerStage,
    playerRoom: payload.playerRoom,
    x: payload.x,
    y: payload.y,
    lineFull: payload.lineFull,
    playerGameOver: payload.playerGameOver,
  },
});

export const reqStartGame = (payload) => ({
  type: ev.START_GAME,
  payload: {
    playerName: payload.playerName,
    playerRoom: payload.playerRoom,
  },
});

/*
 * action creators for server socket events
 */

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
