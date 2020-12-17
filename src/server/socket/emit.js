const emitToAll = (event, payload) => {
  this.io.emit(event, payload);
};

const emitToSocket = (id, event, payload) => {
  this.getSocket(id).emit(event, payload);
};

const emitToRoom = (room, event, payload) => {
  this.io.in(room).emit(event, payload);
};

const emitToRoomExceptSender = (id, room, event, payload) => {
  this.getSocket(id).to(room).emit(event, payload);
};

const emit = () => {

};

export default emit();
