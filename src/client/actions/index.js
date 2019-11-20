/*
 * action types
 */

export const ROOMS_GET = 'ROOMS_GET';
export const PLAYER_LOGIN = 'PLAYER_LOGIN';

/*
 * action creators
 */

export const roomsGet = rooms => ({
    type: ROOMS_GET,
    payload: rooms
});

export const playerLogin = login => ({
    type: PLAYER_LOGIN,
    payload: login
});
