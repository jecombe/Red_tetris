import ev from '../../shared/events';

/*
 * action creators for socket middleware
 */

export const socketConnect = (payload) => ({
  type: ev.SOCKET_CONNECT,
  payload: {
    connected: false,
    host: payload.host,
    port: payload.port,
  },
});

export const socketDisconnect = () => ({
  type: ev.SOCKET_DISCONNECT,
  payload: {
    connected: true,
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
    games: payload.games,
  },
});
