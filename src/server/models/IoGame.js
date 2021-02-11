import Game from './Game';

export default class IoGame {
  constructor() {
    this.io = null;
    this.sockets = {};
    this.games = {};
  }

  /* Io */

  setIo(io) {
    this.io = io;
  }

  emitToAll(event, payload) {
    this.io.emit(event, payload);
  }

  emitToSocket(id, event, payload) {
    this.getSocket(id).emit(event, payload);
  }

  emitToRoom(room, event, payload) {
    this.io.in(room).emit(event, payload);
  }

  emitToRoomExceptSender(id, room, event, payload) {
    this.getSocket(id).to(room).emit(event, payload);
  }

  /* Sockets */

  getSockets() {
    return this.sockets;
  }

  getNbSockets() {
    return Object.keys(this.getSockets()).length;
  }

  getSocket(id) {
    return this.sockets[id];
  }

  getSocketRoom(id) {
    return this.sockets[id].room;
  }

  setSocket(socket) {
    this.sockets[socket.id] = socket;
  }

  setSocketRoom(id, room) {
    this.sockets[id].room = room;
  }

  unsetSocketRoom(id) {
    delete this.sockets[id].room;
  }

  unsetSocket(id) {
    delete this.sockets[id];
  }

  /* Games */

  getGames() {
    return this.games;
  }

  getNbGames() {
    return Object.keys(this.getGames()).length;
  }

  getGame(room) {
    return this.games[room];
  }

  setGame(room, owner) {
    this.games[room] = new Game(room, owner);
  }

  unsetGame(room) {
    delete this.games[room];
  }
}
