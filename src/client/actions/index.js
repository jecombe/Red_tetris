/*
 * action types
 */

export const PLAYER_LOGIN = 'PLAYER_LOGIN';

/*
 * action creators
 */

export const playerLogin = login => ({
    type: PLAYER_LOGIN,
    payload: login
});
