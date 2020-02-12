import Piece from './Piece';
import { createStage, createStagePiece } from '../stage/utils';
import { flushUpdate } from '../stage/stage';

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
  getPlayer(id) {
    return this.users.find((x) => x.idSocket === id);
  }


  unsetPlayer(id) {
    const index = this.users.findIndex((user) => user.idSocket === id);
    this.users.splice(index, 1);
  }

  startGame(id) {
    console.log("ID ", id)
    if (!this.getPlayer(id).isOwner()) return false;
    const newStage = createStage().map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    this.setTetroNull();
    this.setGameStart();
    this.getPieceStart().cleanPiece(newStage);

    this.users.map((user) => {
      user.initPlayer(this.users.length, this.getPieceStart(), newStage);
      user.setNextPiece(flushUpdate(this.getNextPieceStart(), createStagePiece(), user.getPositionX(), user.getPositionY(), false));
      return user;
    });
    
    return ({
      newStage: createStage(),
      nextPiece: flushUpdate(this.getNextPieceStart(), createStagePiece(), this.users[0].getPositionX(), this.users[0].getPositionY(), false),
      otherNotLosing: 1,
      position: {x: 10 / 2 - 2, y: 0},
      collided: false,
      piece: this.getPieceStart(),

    });
  }


}
