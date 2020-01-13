import ev from '../../shared/events';

/*
 * action creators for socket middleware
 */

export const CLIENT_CONNECT = (payload) => ({
  type: ev.CLIENT_CONNECT,
  payload: {
    host: payload.host,
    port: payload.port,
  },
});

export const CLIENT_DISCONNECT = () => ({
  type: ev.CLIENT_DISCONNECT,
  payload: {
    connected: false,
  },
});

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
