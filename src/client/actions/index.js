import ev from '../../shared/events';
import params from '../../shared/params';

/*
 * action creators for socket middleware
 */

export const CLIENT_CONNECT = (payload) => ({
  type: `${params.socket.id}_CONNECT`,
  payload: {
    host: payload.host,
    port: payload.port,
  },
});

export const CLIENT_DISCONNECT = () => ({
  type: `${params.socket.id}_DISCONNECT`,
  payload: {
    connected: false,
  },
});

export const APP_STATE = 'APP_STATE';
export const CLIENT_STATE = (payload) => ({
  type: APP_STATE,
  payload: {
    connected: payload.connected,
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
  },
});

export const updateStage = (payload) => ({
  type: ev.STAGE,
  payload: {
    playerStage: payload.newStage,
    playerNextPiece: payload.nextPiece,
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
  },
});
