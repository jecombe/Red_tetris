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

export const reqSendPosition = (pos) => ({
  type: ev.POSITION_TETRO,
  payload: {
    keyCode: pos,
  },
});

export const reqStartGame = (infoUserGame) => ({
  type: ev.START_GAME,
  payload: {
    username: infoUserGame.playerName,
    room: infoUserGame.playerRoom,
  },
});

/*
 * action creators for server socket events
 */

export const appGetRooms = (payload) => ({
  type: ev.res_ROOMS,
  payload: {
    rooms: payload.rooms,
  },
});

export const appGetStage = (payload) => ({
  type: ev.OBJ_PLAYER,
  payload: {
    playerStage: payload.stage,
    playerOtherStage: payload.otherStage,
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
