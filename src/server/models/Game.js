import Piece from './Piece';
import { createStage, createStagePiece } from '../stage/utils';
import { flushUpdate } from '../stage/stage';

export default class Game {
  constructor(playerName, roomName) {
    this.owner = playerName;
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

  getPlayer(id) {
    return this.users.find((x) => x.id === id);
  }

  getPlayerByPlayerName(playerName) {
    return this.users.find((x) => x.username === playerName);
  }

  getPieceStart() {
    return this.tetro[0];
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
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  startGame(id) {
    if (!this.getPlayer(id).owner) return false;
    const newStage = createStage().map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    this.setTetroNull();
    this.setGameStart();
    this.getPieceStart().cleanPiece(newStage);

    this.users.map((user) => {
      user.initPlayer(this.users.length, this.getPieceStart(), newStage);
      user.setNextPiece(flushUpdate(this.getNextPieceStart(), user, createStagePiece()));
      return user;
    });
    
    return ({
      newStage,
      nextPiece: flushUpdate(this.getNextPieceStart(), this.users[0], createStagePiece()),
      gameOver: false,
      otherNotLosing: 1,
      actualPiece: this.tetro[0],
      pos: {x: 10 / 2 - 2, y: 0},
    });
  }
}
