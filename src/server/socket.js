import { actions } from './actions/eventActions';

const socketHandler = (io, userlist, rooms) => {
  io.on('connection', (socket) => {
    io.emit('appGetRooms', {
      rooms,
    });
    /* --- Go to action dispatcher --- */
    actions(socket, userlist, rooms, io);
  });
};

module.exports = socketHandler;
