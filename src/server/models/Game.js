import { v4 as uuidv4 } from 'uuid';
import { array } from 'prop-types';
import Piece from './Piece';
import Player from './Player';
import { createStage, updateStage, createStagePiece, flushUpdate } from '../../shared/stage';
// import { createStage, updateStage } from '../../../../../shared/stage';

import { emitterMallus, emitterStageOther, emitterWinner } from '../actions/emitter';

export default class Game {
  constructor(room, owner) {
    this.room = room;
    this.settings = {
      owner,
      started: false,
      status: '',
      nbPlayers: 0,
      dropTime: 1000,
      loosers: 0,
      pieces: [],
    };
    this.players = {};
    this.chat = [];
  }

  getRoom() {
    return this.room;
  }

  getRoomSettings() {
    return this.settings;
    // return {
    //   room: this.room,
    //   settings: this.settings,
    // };
  }

  setOwner(name) {
    // this.owner = name;
    this.settings.owner = name;
  }

  setRandomOwner() {
    const playersKeys = Object.keys(this.players);
    this.setOwner(playersKeys[Math.floor(Math.random() * playersKeys.length)]);
  }

  getOwner() {
    return this.settings.owner;
  }

  isOwner(name) {
    return this.getOwner() === name;
  }

  setStarted(started) {
    this.settings.started = started;
  }

  getStarted() {
    return this.settings.started;
  }

  /* Players */

  setPlayer(id, name) {
    this.players[id] = new Player(name);
    this.settings.nbPlayers += 1;
  }

  setPlayerStage(name, stage) {
    this.getPlayer(name).setStage(stage);
  }

  setPlayerCollision(id, data) {
    this.getPlayer(id).setStage(data.stage);
    this.getPlayer(id).setLineFull(data.lines);
    this.getPlayer(id).setScore(data.score);
    this.getPlayer(id).setLevel(data.level);
  }

  unsetPlayer(name) {
    delete this.players[name];
    this.nbPlayers -= 1;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(name) {
    return this.players[name];
  }

  isEmpty() {
    return (Object.keys(this.getPlayers()).length === 0);
  }

  /* Pieces */

  setTetro() {
    this.settings.pieces.push(new Piece());
  }

  setTetroNull() {
    this.settings.pieces = [];
  }

  getTetros() {
    return this.settings.pieces;
  }

  /* Messages */

  setMessage(user, text) {
    this.chat.push({
      id: uuidv4(),
      user,
      text,
      date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
    });
  }

  getMessages() {
    return this.chat;
  }

  /* DropTime */

  getDropTime() {
    return this.settings.dropTime;
  }

  /* Loosers */

  setLoosers() {
    this.settings.loosers += 1;
  }

  setLoosersNull() {
    this.settings.loosers = 0;
  }

  getLoosers() {
    return this.settings.loosers;
  }

  login(id, name) {
    this.setPlayer(id, name);
    this.setMessage('server', `${name} joined the room`);
  }

  logout(name) {
    this.unsetPlayer(name);
    this.setMessage('server', `${name} leaved the room`);
  }

  start(name) {
    // throw new Error('erroooooar!!');
    if (!this.isOwner(name) || this.getStarted()) {
      throw new Error('You can\'t start the game');
    }

    const position = { x: 3, y: 0 };

    this.setStarted(true);
    this.settings.pieces = [];
    this.setTetro();
    this.setTetro();
    this.setTetro();
    this.loosers = [];
    Object.values(this.players).forEach((player) => {
      player.setPiece(this.settings.pieces[0]);
      player.updateStage(position, false);
    });
    // this.setLoosersNull();
  }

  updateCollision(name, stage) {
    this.getPlayer(name).updateCollision(stage, this.settings.pieces);
    if (!this.getTetros()[this.getPlayer(name).nbPiece + 2]) {
      this.setTetro();
    }
  }

  move(name, keyCode) {
    this.getPlayer(name).move(keyCode, this.settings.pieces);
    if (!this.getTetros()[this.getPlayer(name).nbPiece + 2]) {
      this.setTetro();
    }
    // this.getPlayer(name).setPiece(this.settings.pieces())
  }

  /* Events */
  // login(req, res) {
  //   try {
  //     const { name, room } = data;

  //     if (!name || !room || name.length > 15 || room.length > 15) throw new Error('Invalid name or room');
  //     if (redGame.getGame(room) && this.getStarted()) throw new Error('Game already started');
  //     if (redGame.getGame(room) && this.getPlayer(name)) throw new Error('Existing user with same name');
  //     this.setPlayer(req.socket.id, req.data.name);
  //   } catch (err) {

  //   }
  // }
}
