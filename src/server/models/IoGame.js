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

  getGame(room) {
    return this.games[room];
  }

  getNbGames() {
    return Object.keys(this.getGames()).length;
  }

  setGame(room, owner) {
    this.games[room] = new Game(room, owner);
  }

  unsetGame(room) {
    delete this.games[room];
  }

  /* App */

  reqLogin(req, res) {
    const { socket } = req;
    const { name, room } = req.data;

    if (!name || !room || name === '' || room === '') {
      throw new Error('[reqLogin] Invalid name or room');
    }
    if (!this.getGame(room)) {
      this.setGame(room, name);
    }

    this.getGame(room).login(socket.id, name);

    this.getSocket(socket.id).join(room);
    this.setSocketRoom(socket.id, room);
  }

  reqLogout(req, res) {
    const { socket } = req;
    const { name, room } = req.data;

    if (!room || room === '' || !this.getGame(room)) {
      throw new Error('[reqLogout] Invalid room');
    }

    this.getGame(room).logout(socket.id, name);

    if (this.getGame(room).isEmpty()) {
      this.unsetGame(room);
    }

    this.getSocket(socket.id).leave(room);
    this.unsetSocketRoom(socket.id);
  }

  /* Game */

  reqStart(req, res) {
    const { name, room } = req.data;

    if (!this.getGame(room)) {
      throw new Error("Can't start game");
    }

    this.getGame(room).start(name);
  }

  reqOwner(req, res) {
    const { name, room, newOwner } = req.data;

    if (!this.getGame(room) || !this.getGame(room).isOwner(name)) {
      throw new Error("Can't change owner");
    }

    this.getGame(room).setNewOwner(name, newOwner);
  }

  reqChat(req, res) {
    const { room, name, text } = req.data;

    if (!this.getGame(room) || !this.getGame(room).getPlayer(req.socket.id)) {
      throw new Error("Can't send message");
    }

    this.getGame(room).setMessage(name, text);
  }

  /* Player */

  reqMove(req, res) {
    const { room, name, keyCode } = req.data;

    if (!this.getGame(room)) {
      throw new Error('Game not exist');
    }
    const { collided, loose } = this.getGame(room).move(name, keyCode);
  }
}
