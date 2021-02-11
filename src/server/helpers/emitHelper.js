export const emitToAll = (io, event, payload) => {
  io.emit(event, payload);
};

export const emitToSocket = (socket, event, payload) => {
  socket.emit(event, payload);
};

export const emitToRoom = (io, room, event, payload) => {
  io.in(room).emit(event, payload);
};

export const emitToRoomExceptSender = (socket, room, event, payload) => {
  socket.to(room).emit(event, payload);
};

export default {
  emitToAll,
  emitToSocket,
  emitToRoom,
  emitToRoomExceptSender,
};
