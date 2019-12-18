import Piece from './Piece';

export default class Game {
  constructor(username, roomName) {
    this.owner = username;
    this.roomName = roomName;
    this.users = [];
    this.gameStart = false;
    this.tetro = [];
  }

  getGameName() {
    return this.roomName;
  }

  getOwnerGame() {
    return this.owner;
  }

  getNextPieceStart() {
    return this.tetro[1];
  }

  getUserInGame() {
    return this.users;
  }

  setPlayerOwner(owner) {
    this.owner = owner;
  }

  setPlayer(user) {
    this.users.push(user);
  }

  setGameStart() {
    this.gameStart = true;
    this.tetro.push(new Piece());
    this.tetro.push(new Piece());
  }

  setTetro() {
    this.tetro.push(new Piece());
  }

  setTetroNull() {
    this.tetro = [];
  }

  unsetPlayer(id) {
    const index = this.users.findIndex((user) => user.idSocket === id);
    this.users.splice(index, 1);
  }
}
