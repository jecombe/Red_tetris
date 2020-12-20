import { v4 as uuidv4 } from 'uuid';
import { array } from 'prop-types';
import Piece from './Piece';
import Player from './Player';
import {
  createStage, updateStage, createStagePiece, flushUpdate,
} from '../../shared/stage';
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
      dropTime: 0,
      loosers: 0,
      pieces: [],
    };
    this.players = {};
    this.chat = [];
  }

  getRoom() {
    return this.room;
  }

  /* Settings */

  getSettings() {
    return this.settings;
  }

  getSettingsOwner() {
    return this.settings.owner;
  }

  getStarted() {
    return this.settings.started;
  }

  getTetros() {
    return this.settings.pieces;
  }

  getDropTime() {
    return this.settings.dropTime;
  }

  /* Loosers */

  getLoosers() {
    return this.settings.loosers;
  }

  setOwner(name) {
    this.settings.owner = name;
  }

  setRandomOwner() {
    const playersKeys = Object.keys(this.players);
    this.setOwner(playersKeys[Math.floor(Math.random() * playersKeys.length)]);
  }

  setStarted(started) {
    this.settings.started = started;
  }

  setTetro() {
    this.settings.pieces.push(new Piece());
  }

  setTetroNull() {
    this.settings.pieces = [];
  }

  setLoosers() {
    this.settings.loosers += 1;
  }

  setLoosersNull() {
    this.settings.loosers = 0;
  }

  isOwner(name) {
    return this.getSettingsOwner() === name;
  }

  /* Players */

  getPlayers() {
    return this.players;
  }

  getPlayer(id) {
    return this.players[id];
  }

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

  isEmpty() {
    return (Object.keys(this.getPlayers()).length === 0);
  }

  /* Chat */

  getMessages() {
    return this.chat;
  }

  setMessage(user, text) {
    this.chat.push({
      id: uuidv4(),
      user,
      text,
      date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
    });
  }

  /* Controllers handler */

  login(id, name) {
    this.setPlayer(id, name);
    this.setMessage('server', `${name} joined the room`);
  }

  logout(name) {
    this.unsetPlayer(name);
    this.setMessage('server', `${name} leaved the room`);
  }

  start(name) {
    if (!this.isOwner(name) || this.getStarted()) {
      throw new Error('You can\'t start the game');
    }

    const position = { x: 3, y: 0 };

    this.setStarted(true);
    this.settings.pieces = [];
    this.setTetro();
    this.setTetro();
    this.setTetro();
    this.settings.dropTime = 1000;
    this.loosers = [];
    Object.values(this.players).forEach((player) => {
      player.setPiece(this.settings.pieces[0]);
      player.updateStage(position, false);
    });
    // this.setLoosersNull();
  }

  updateCollision(name, stage, lines) {
    this.getPlayer(name).updateCollision(stage, lines, this.settings.pieces);
    if (!this.getTetros()[this.getPlayer(name).nbPiece + 2]) {
      this.setTetro();
    }
    if (lines > 1) {
      Object.entries(this.players).forEach((entry) => {
        if (entry[0] !== name) entry[1].setMallus(lines - 1);
      });
    }
  }

  move(name, keyCode) {
    this.getPlayer(name).move(keyCode, this.settings.pieces);
    if (!this.getTetros()[this.getPlayer(name).nbPiece + 2]) {
      this.setTetro();
    }
    // this.getPlayer(name).setPiece(this.settings.pieces())
  }
}
