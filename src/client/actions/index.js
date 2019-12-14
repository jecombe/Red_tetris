import ev from '../../shared/events';

/*
 * action types
 */

export const APP_STATUS = 'APP_STATUS';

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
