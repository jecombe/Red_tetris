/*
 * action types
 */


export const APP_STATUS = 'APP_STATUS';
export const APP_CONNECTED = 'APP_CONNECTED';
export const APP_DISCONNECTED = 'APP_DISCONNECTED';
export const APP_GET_ROOMS = 'APP_GET_ROOMS';
export const APP_GET_STAGE = 'APP_GET_STAGE';


export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const PLAYER_LOGIN_ENTER_GAME = 'PLAYER_LOGIN_ENTER_GAME';
export const PLAYER_START_GAME = 'PLAYER_START_GAME';


export const UPDATE_STAGE = 'UPDATE_STAGE';
export const MOVE_TETRO = 'MOVE_TETRO';


/*
 * action creators
 */

export const updateAppStatus = (payload) => ({
  type: APP_STATUS,
  payload: payload.connexion
});

export const appGetRooms = (payload) => ({
  type: APP_GET_ROOMS,
  payload: payload.rooms,
});

export const appGetStage = (payload) => ({
  type: APP_GET_STAGE,
  payload: {
    stage: payload.stage,
    collided: payload.collided,
  },
});


export const updateStage = (payload) => ({
  type: UPDATE_STAGE,
  payload: payload.newStage,
});

export const sendPosition = (pos) => ({
  type: MOVE_TETRO,
  payload: {
    keyCode: pos,
  },
  socket: {
    send: {
      channel: 'PositionTetro',
    },
  },
});


export const playerLoginEnterGame = (infoUserGame) => ({
  type: PLAYER_LOGIN_ENTER_GAME,
  payload: {
    username: infoUserGame.playerName,
    roomActual: infoUserGame.playerRoom,
  },
  socket: {
    send: {
      channel: 'LoginUserGame',
    },
  },
});

export const playerStartGame = (infoUserGame) => ({
  type: PLAYER_START_GAME,
  payload: {
    username: infoUserGame.playerName,
    room: infoUserGame.playerRoom,
  },
  socket: {
    send: {
      channel: 'startGame',
    },
  },
});

/*
export const playerLogin = login => ({
    type: PLAYER_LOGIN,
    payload: login,
    socket: {
        send: {
          channel: 'joinOrCreateGame',
          namespace: 'ns',
          room: 'test'
        }
      }
});

*/
