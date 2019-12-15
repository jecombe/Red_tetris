import ev from '../../shared/events';
import params from '../../shared/params';

/*
 * action types
 */

export const APP_STATE = 'APP_STATE';

/*
 * action creators
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

export const CLIENT_STATE = (payload) => ({
  type: APP_STATE,
  payload: {
    connected: payload.connected,
  },
});

/*
 * action creators for request socket
 */

export const reqLogin = (payload) => ({
  type: ev.req_LOGIN,
  payload: {
    playerName: payload.playerName,
    playerRoom: payload.playerRoom,
  },
});

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
    playerStage: payload.newStage,
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
