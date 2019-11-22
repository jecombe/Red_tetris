/*
 * action types
 */

export const ROOMS_GET = 'ROOMS_GET';
export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const PLAYER_LOGIN_ENTER_GAME = 'PLAYER_LOGIN_ENTER_GAME';

/*
 * action creators
 */

export const roomsGet = rooms => ({
    type: ROOMS_GET,
    payload: rooms
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

export const playerLoginEnterGame = (infoUserGame) => ({
    type: PLAYER_LOGIN_ENTER_GAME,
    payload: {
        username: infoUserGame.playerName,
        roomActual: infoUserGame.playerRoom
    },
    socket: {
        send: {
          channel: 'LoginUserGame',
        }
      }
});

