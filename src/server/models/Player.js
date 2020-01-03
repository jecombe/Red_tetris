import { createStage, createStagePiece } from '../stage/utils';

export default class Player {
  constructor(socketId, username, room) {
    this.idSocket = socketId;
    this.login = username;
    this.owner = false;
    this.stage = createStage();
    this.losing = false;
    this.roomAssociate = room;
    this.pos = { x: 0, y: 0 };
    this.pos1 = { x: 0, y: 0 };
    this.collided = false;
    this.piece = null;
    this.index = 0;
    this.nextPiece = createStagePiece();
    this.mallus = 0;
    this.lineFull = 0;
    this.otherStage = [];
    this.peopleSpectre = [];
    this.notLosing = -1;
    this.win = false;
  }

  getLosing() {
    return this.losing;
  }

  getLogin() {
    return this.login;
  }

  setWin() {
    this.win = true;
  }

  getIdSocket() {
    return this.idSocket;
  }

  getroomAssociate() {
    return this.roomAssociate;
  }

  getNextPiece() {
    return this.nextPiece;
  }

  getMallus() {
    return this.mallus;
  }

  isOwner() {
    return this.owner;
  }

  getLineFull() {
    return this.lineFull;
  }

  getPeopleSpectre() {
    return this.peopleSpectre;
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

  setPositionNextTetro(x, y) {
    this.pos1.x = x;
    this.pos1.y = y;
  }

  setPositionNull() {
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
    this.collided = false;
    this.pos = { x: 0, y: 0 };
    this.piece = null;
    this.index = 0;
    this.mallus = 0;
    this.lineFull = 0;
    this.losing = false;
    this.win = false;
  }

  setMallus() {
    this.mallus += 1;
  }

  setLineFull() {
    this.lineFull += 1;
  }

  setNullOtherStage() {
    this.otherStage = [];
  }

  setOtherStage(stage) {
    this.otherStage.push(stage);
  }

  setPeopleSpectre(people) {
    this.peopleSpectre.push(people);
  }

  setLosing(trueOfalse) {
    this.losing = trueOfalse;
  }
  setNoLosing(number) {
    this.notLosing = number
  }
  setNoLosing2() {
    this.notLosing -= 1
  }
}
