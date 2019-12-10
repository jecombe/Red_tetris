import socketIO from 'socket.io';
import { actions } from './actions/eventActions';
import logger from './helpers/logger';
import { loginUser } from './handlers/player/createPlayer';

const CLIENT_STATUS = 'client/status';
const CLIENT_ROOMS = 'client/rooms';

const io = server => {
  const connections = [];
  const userlist = [];
  const rooms = [];

  const io = socketIO(server, {
    pingInterval: 5000,
    pingTimeout: 15000,
  });

  io.use((socket, next) => {
    connections.push(socket.id);
    console.log(socket.id);
    // logger.info('[IO-MIDDLEWARE]: ', id);
    socket.emit(CLIENT_STATUS, {
      type: CLIENT_STATUS,
      connexion: true
    });
    return next();
  });

  io.on('connection', (socket) => {
    const { id } = socket;
    logger.info('Socket connected:', { id });
    logger.info('Socket connected:', connections)

    socket.on('disconnect', (action) => {
      logger.info('Socket disconnected:', socket.id)
    });
  })
}

const socketHandler = (io, userlist, rooms) => {
  io.on('connection', (socket) => {
    io.emit('appGetRooms', {
      rooms,
    });
    /* --- Go to action dispatcher --- */
    actions(socket, userlist, rooms, io);
  });
};

export default io;
