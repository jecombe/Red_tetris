import socketIO from 'socket.io';

import ev from '../shared/events';
import logger from './utils/logger';
import IoGame from './models/IoGame';
import { socketConnect, socketDisconnect, socketError } from './actions/socket';
import { login, logout, rooms } from './actions/login';
import { startGame, positionTetro } from './actions/game';
import { message } from './actions/chat';

const io = (server) => {
  const socketServer = socketIO(server, {
    path: '/',
    serveClient: true,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  });

  const redGame = new IoGame(socketServer);

  redGame.socketServer.on(ev.CONNECT, (socket) => {
    socketConnect(socket, redGame);

    socket.on(ev.DISCONNECT, () => socketDisconnect(socket, redGame));
    socket.on(ev.ERROR, () => socketError(socket, redGame));

    socket.on(ev.req_LOGIN, (data) => login(socket, data, redGame));
    socket.on(ev.req_ROOMS, (data) => rooms(socket, data, redGame));

    socket.on(ev.START_GAME, (data) => startGame(socket, data, redGame));
    socket.on(ev.POSITION_TETRO, (data) => positionTetro(socket, data, redGame));

    socket.on(ev.req_ECHO, (data) => message(socket, data, redGame));
    socket.on(ev.req_BELLO, (data) => message(socket, data, redGame));
  });
};

module.exports = io;
