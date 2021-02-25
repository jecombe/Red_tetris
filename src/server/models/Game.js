import { v4 as uuidv4 } from 'uuid';
import Piece from './Piece';
import Player from './Player';

export default class Game {
  constructor(room, owner) {
    this.room = room;
    this.settings = {
      owner,
      started: false,
      status: '',
      nbPlayers: 0,
      nbLoosers: 0,
      dropTime: 0,
      pieces: [],
    };
    this.players = {};
    this.chat = [];
  }

  getRoom() {
    return this.room;
  }

  isOwner(name) {
    return this.settings.owner === name;
  }

  /* Players */

  getPlayers() {
    return this.players;
  }

  getPlayer(id) {
    return this.players[id];
  }

  isEmpty() {
    return Object.keys(this.getPlayers()).length === 0;
  }

  /* Login */

  login(id, name) {
    // this.setPlayer(id, name);
    this.players[id] = new Player(name);
    this.settings.nbPlayers += 1;
    this.setMessage('server', `${name} joined the room`);
  }

  logout(id, name) {
    if (!this.getPlayer(id)) {
      throw new Error('[logout]: No player found');
    }
    delete this.players[id];
    this.settings.nbPlayers -= 1;
    this.setMessage('server', `${name} leaved the room`);
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

  /* Owner */

  setOwner(name) {
    this.settings.owner = name;
    this.setMessage('server', `${this.settings.owner} is the new owner`);
  }

  setRandomOwner() {
    const players = Object.keys(this.players);
    this.setOwner(players[Math.floor(Math.random() * players.length)]);
  }

  setNewOwner(name, owner) {
    if (!this.isOwner(name)) {
      throw new Error('Not owner');
    }

    if (owner === '') this.setRandomOwner();
    else this.setOwner(owner);
  }

  /* Players */

  start(name) {
    if (!this.isOwner(name) || this.settings.started === true) {
      throw new Error("You can't start the game");
    }

    this.settings.started = true;
    this.settings.pieces = [new Piece(), new Piece(), new Piece()];
    this.settings.dropTime = 1000;
    this.settings.nbLoosers = 0;
    Object.values(this.players).forEach((player) => {
      player.start(this.settings.pieces[0]);
    });
  }

  end() {
    this.settings.started = false;
  }

  move(name, keyCode) {
    if (this.settings.started === false) {
      throw new Error('Game not started');
    }
    const { collided, loose, lines } = this.getPlayer(name).move(keyCode);

    if (collided === true) {
      if (!this.settings.pieces[this.getPlayer(name).nbPiece + 2]) {
        this.settings.pieces.push(new Piece());
      }
      this.getPlayer(name).updateCollision(this.settings.pieces);
      this.setMallus(name, lines);
    }
    if (loose === true) {
      this.getPlayer(name).loose = true;
      this.settings.nbLoosers += 1;
      if (this.settings.nbLoosers === this.settings.nbPlayers) {
        this.end();
      }
    }
    return { collided, loose };
  }

  setMallus(name, mallus) {
    if (mallus > 1) {
      Object.entries(this.players).forEach((entry) => {
        if (entry[0] !== name) entry[1].setMallus(mallus - 1);
      });
    }
  }
}
