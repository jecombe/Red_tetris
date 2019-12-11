import { threadId } from 'worker_threads';
import Room from './Room';
import Piece from './Piece';

export default class Game extends Room {
  constructor(nameGame) {
    super(nameGame);
    this.gameStart = false;
    this.userPiece = [];
    this.tetro = [];
  }

  getgameName() {
    return this.roomName;
  }

  getOwnerGame() {
    return this.owner;
  }

  setPlayerOwner(owner) {
    this.owner = owner;
  }

  setUser(user) {
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
}
