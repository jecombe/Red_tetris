import { v4 as uuidv4 } from 'uuid';

import ev from '../../shared/events';
import logger from '../utils/logger';
// import { emitToAll, emitToSocket, emitToRoom, emitToRoomExceptSender } from '../helpers/emitHelper';

import Game from './Game';
import Player from './Player';

export default class IoGame {
  constructor() {
    this.io = null;
    this.sockets = {};
    this.games = {};
  }

  /* Io */

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

  setIo(io) {
    this.io = io;
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

  getSockets() {
    return this.sockets;
  }

  getSocket(id) {
    return this.sockets[id];
  }

  getSocketRoom(id) {
    return this.sockets[id].room;
  }

  /* Games */

  setGame(room, owner) {
    this.games[room] = new Game(room, owner);
  }

  unsetGame(room) {
    delete this.games[room];
  }

  getGames() {
    return this.games;
  }

  getGame(room) {
    return this.games[room];
  }

  /* Events handler */

  connect(socket) {
    this.setSocket(socket);
  }

  disconnect(socket) {
    if (this.getSocketRoom(socket.id)) {
      this.logout(this.getSocketRoom(socket.id), socket.id);
    }
    this.unsetSocket(socket.id);
  }

  login(room, id, name) {
    if (!this.getGame(room)) {
      this.setGame(room, name);
    }

    this.getGame(room).login(id, name);
    this.setSocketRoom(id, room);
  }

  logout(room, name) {
    if (!this.getGame(room)) {
      throw new Error('Game not exist');
    }

    this.getGame(room).logout(name);

    if (this.getGame(room).isEmpty()) {
      this.unsetGame(room);
    }

    this.unsetSocket(name);
  }

  start(room, name) {
    this.getGame(room).start(name);
  }

  move(room, name, keyCode) {
    this.getGame(room).move(name, keyCode);
  }
}
