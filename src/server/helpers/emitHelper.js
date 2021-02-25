export const emitToAll = (io, event, data) => {
  io.emit(event, data);
};

export const emitToSocket = (socket, event, data) => {
  socket.emit(event, data);
};

export const emitToRoom = (io, room, event, data) => {
  io.in(room).emit(event, data);
};

export const emitToRoomExceptSender = (socket, room, event, data) => {
  socket.to(room).emit(event, data);
};

export default {
  emitToAll,
  emitToSocket,
  emitToRoom,
  emitToRoomExceptSender,
};
