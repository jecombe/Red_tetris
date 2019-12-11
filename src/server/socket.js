import socketIO from 'socket.io';

import ev from './utils/events';
import logger from './utils/logger';
import ioEngine from './socket/';

const io = (server) => {
  const socketServer = socketIO(
    server,
    {
      pingInterval: 5000,
      pingTimeout: 15000,
    },
  );

  // socket CONNECT
  socketServer.on(ev.CONNECT, (socketClient) => {
    logger.info(`Client ${socketClient.id} connected.`);

    // socket DISCONNECT
    socketClient.on(ev.DISCONNECT, () => {
      logger.info(`Client ${socketClient.id} disconnected.`);
    });

    // socket ERROR
    socketClient.on(ev.ERROR, () => {
      logger.error(`Client ${socketClient.id} error.`);
    });

    ioEngine(io, socketClient);
  });
};

module.exports = io;

// import socketIO from 'socket.io';
// import { actions } from './actions/eventActions';
// import logger from './helpers/logger';
// import { loginUser } from './handlers/player/createPlayer';

// const CLIENT_STATUS = 'client/status';
// const CLIENT_ROOMS = 'client/rooms';

// const ioHandler = (server) => {
//   const connections = [];
//   const userlist = [];
//   const rooms = [];

//   const io = socketIO(server, {
//     pingInterval: 5000,
//     pingTimeout: 15000,
//   });

//   io.use((socket, next) => {
//     connections.push(socket.id);
//     const { id } = socket;
//     logger.info('io-middleware:', { id });
//     socket.emit(CLIENT_STATUS, {
//       type: CLIENT_STATUS,
//       connexion: true,
//     });
//     return next();
//   });

//   io.on('connection', (socket) => {
//     const { id } = socket;

//     logger.info('io-connect:', { id });

//     socket.on('error', (err) => {
//       logger.err('Socket err:', err);
//     });

//     socket.on('disconnect', (action) => {
//       logger.info('Socket disconnected:', socket.id);
//     });
//   });
// };

// const socketHandler = (io, userlist, rooms) => {
//   io.on('connection', (socket) => {
//     io.emit('appGetRooms', {
//       rooms,
//     });
//     /* --- Go to action dispatcher --- */
//     actions(socket, userlist, rooms, io);
//   });
// };

// export default ioHandler;
