import ev from '../../shared/events';

/*
 * action creators for socket middleware
 */

export const CLIENT_CONNECT = (payload) => ({
  type: ev.CLIENT_CONNECT,
  payload: {
    host: payload.host,
    port: payload.port,
  },
});

export const CLIENT_DISCONNECT = () => ({
  type: ev.CLIENT_DISCONNECT,
  payload: {
    connected: false,
  },
});

/*
 * action creators for client socket event
 */

export const reqLogin = (payload) => ({
  type: ev.req_LOGIN,
  payload: {
    playerName: payload.playerName,
    playerRoom: payload.playerRoom,
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

export const resRooms = (payload) => ({
  type: ev.res_ROOMS,
  payload: {
    rooms: payload.rooms,
    games: payload.games,
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
