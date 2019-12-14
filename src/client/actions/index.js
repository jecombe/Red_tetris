import ev from '../../shared/events';

/*
 * action types
 */

export const APP_STATUS = 'APP_STATUS';
export const APP_GET_ROOMS = 'APP_GET_ROOMS';

/*
 * action creators
 */

export const appStatus = (payload) => ({
  type: APP_STATUS,
  payload: {
    connexion: payload.connexion,
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
