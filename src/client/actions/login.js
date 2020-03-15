import ev from '../../shared/events';

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
