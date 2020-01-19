import { createStage, createStagePiece } from '../stage/utils';

export default class Player {
  constructor(idSocket) {
    this.idSocket = idSocket;
    this.username = '';
    this.room = '';
    this.owner = false;
    this.losing = false;
    this.rank = 0;
    this.score = 0;

    this.stage = createStage();
    this.nextPiece = createStagePiece();
    this.pos = { x: 0, y: 0 };
    this.pos1 = { x: 0, y: 0 };
    this.collided = false;
    this.lineFull = 0;
    this.mallus = 0;
    this.piece = null;
    this.index = 0;

    this.otherStage = [];
    this.peopleSpectre = [];
    this.notLosing = -1;
    this.win = false;
  }

  getLosing() {
    return this.losing;
  }

  getLogin() {
    return this.username;
  }

  getIdSocket() {
    return this.idSocket;
  }

  getroom() {
    return this.room;
  }

  getStage() {
    return this.stage;
  }

  getPlayerOtherStage() {
    return this.otherStage;
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

  setPlayerName(playerName) {
    this.username = playerName;
  }

  setRoomName(roomName) {
    this.room = roomName;
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
    this.notLosing = number;
  }

  setNoLosing2() {
    this.notLosing -= 1;
  }

  setWin() {
    this.win = true;
  }
}
