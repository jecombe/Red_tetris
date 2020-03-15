import socketIO from 'socket.io';

import IoGame from './models/IoGame';
import ev from '../shared/events';
import actions from './actions';

const io = (server) => {
  const socketServer = socketIO(server, {
    pingInterval: 5000,
    pingTimeout: 15000,
  });

  const redGame = new IoGame(socketServer);

  redGame.io.on(ev.CONNECT, (socket) => {
    /* Socket events */
    actions.socketConnect(socket, redGame);
    socket.on(ev.DISCONNECT, () => actions.socketDisconnect(socket, redGame));
    socket.on(ev.ERROR, () => actions.socketError(socket, redGame));

    /* Login events */
    socket.on(ev.req_LOGIN, (data) => actions.resLogin(socket, data, redGame));
    socket.on(ev.req_ROOMS, (data) => actions.resRooms(socket, data, redGame));

    /* Game events */
    socket.on(ev.START_GAME, (data) => actions.startGame(socket, data, redGame));
    socket.on(ev.req_UPDATE_COLLISION, (data) => actions.resUpdateCollision(socket, data, redGame));
  });
};

module.exports = io;
