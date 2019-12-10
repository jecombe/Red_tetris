import { createStage } from '../stage';

export default class Player {
  constructor(socketId, username) {
    this.login = username,
    this.idSocket = socketId,
    this.owner = false,
    this.stage = null,
    this.losing = false,
    this.roomAssociate = null,
    this.pos = { x: 0, y: 0 },
    this.pos1 = { x: 0, y: 0 },
    this.collided = false,
    this.piece = null,
    this.index = 0,
    this.nextPiece = null
  }

  getLogin() {
    return this.login;
  }

  getIdSocket() {
    return this.idSocket;
  }

  getroomAssociate() {
    return this.roomAssociate;
  }

  getNextPiece(){
    return this.nextPiece;
  }
  isOwner() {
    return this.owner;
  }

  setLogin(login) {
    this.login = login;
  }

  setOwner() {
    this.owner = true;
  }

  setStage(stage) {
    this.stage = stage;
  }

  setPosition(x, y) {
    this.pos.x = x + this.pos.x;
    this.pos.y = y + this.pos.y;
  }


  setPosition1(x, y) {
    this.pos.x = x
    this.pos.y = y
  }

  setPositionNull() {
    this.pos = { x: 0, y: 0 };
  }
  setPositionNull1() {
    this.pos = { x: 0, y: 0 };
  }
  setCollidedTrue() {
    this.collided = true;
  }

  setCollidedFalse() {
    this.collided = false;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  setNextPiece(piece) {
    this.nextPiece = piece;
  }


  setIndex(index) {
    this.index = index;
  }

  setPlayerNull() {
    this.collided = false,
    this.pos = { x: 0, y: 0 },
    this.piece = null,
    this.index = 0;
  }
}
