/*
 * action types
 */

export const APP_CONNECTED = 'APP_CONNECTED';
export const APP_DISCONNECTED = 'APP_DISCONNECTED';
export const APP_GET_ROOMS = 'APP_GET_ROOMS';
export const APP_GET_STAGE = 'APP_GET_STAGE';


export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const PLAYER_LOGIN_ENTER_GAME = 'PLAYER_LOGIN_ENTER_GAME';
export const PLAYER_START_GAME = 'PLAYER_START_GAME';


export const UPDATE_STAGE = 'UPDATE_STAGE';
export const UPDATE_STAGE_MALLUS = 'UPDATE_STAGE_MALLUS';

export const MOVE_TETRO = 'MOVE_TETRO';


/*
 * action creators
 */

export const appConnected = () => ({
  type: APP_CONNECTED,
});

export const appDisconnected = () => ({
  type: APP_DISCONNECTED,
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
  payload: {
    stage: payload.newStage,
    nextPiece: payload.nextPiece
  }
});

export const updateStageMallus = (payload) => ({
  type: UPDATE_STAGE_MALLUS,
  payload: {
    stage: payload.newStage,
  }
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
