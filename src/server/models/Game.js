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

  /* Room */

  getRoom() {
    return this.room;
  }

  isOwner(name) {
    return this.settings.owner === name;
  }

  /* Settings */

  setStarted(started) {
    this.settings.started = started;
  }

  getStarted() {
    return this.settings.started;
  }

  setPiece(piece) {
    this.settings.pieces.push(piece);
  }

  setDropTime(dropTime) {
    this.settings.dropTime = dropTime;
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

  setLogin(id, name) {
    // this.setPlayer(id, name);
    if (this.settings.started === true) {
      throw new Error('Game is started');
    }

    this.players[id] = new Player(name);
    this.settings.nbPlayers += 1;
    this.setMessage('server', `${name} joined the room`);
  }

  setLogout(id, name) {
    if (!this.getPlayer(id)) {
      throw new Error('No player found');
    }
    delete this.players[id];
    this.settings.nbPlayers -= 1;
    this.setMessage('server', `${name} leaved the room`);
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

  setNewOwner(name, newOwner) {
    if (!this.isOwner(name)) {
      throw new Error('Not owner');
    }

    if (newOwner === '') this.setRandomOwner();
    else this.setOwner(newOwner);
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

  /* Game */

  setStart(name) {
    if (!this.isOwner(name) || this.settings.started === true) {
      throw new Error("Can't start the game");
    }

    this.setStarted(true);
    this.setPiece(new Piece());
    this.setPiece(new Piece());
    this.setPiece(new Piece());
    this.setDropTime(1000);
    this.settings.nbLoosers = 0;
    Object.values(this.players).forEach((player) => {
      player.setStart(this.settings);
    });

    this.setMessage('server', `${name} started the game`);
  }

  setMove(name, keyCode) {
    if (this.settings.started === false) {
      throw new Error('Game not started');
    }

    this.getPlayer(name).setMove(keyCode);

    const { collided } = this.getPlayer(name);

    if (this.getPlayer(name).collided === true) this.updateCollision(name);
    if (this.getPlayer(name).loose === true) this.updateLoose(name);
    // const { collided, loose, lines } = this.getPlayer(name).move(keyCode);

    // if (collided === true) {
    //   if (!this.settings.pieces[this.getPlayer(name).nbPiece + 2]) {
    //     this.settings.pieces.push(new Piece());
    //   }
    //   this.getPlayer(name).updateCollision(this.settings.pieces);
    //   this.setMallus(name, lines);
    // }
    // if (this.getPlayer(name).loose === true) {
    //   // this.getPlayer(name).loose = true;
    //   this.settings.nbLoosers += 1;
    //   this.getPlayer(name).setRank(this.settings.nbLoosers, this.settings.nbPlayers);
    //   if (this.settings.nbLoosers === this.settings.nbPlayers) {
    //     this.end();
    //   }
    // }
    return { collided, loose: false };
  }

  updateCollision(name) {
    if (!this.settings.pieces[this.getPlayer(name).nbPiece + 3]) {
      this.settings.pieces.push(new Piece());
    }

    const { lines } = this.getPlayer(name).setCollision(this.settings.pieces);
    if (lines > 1) {
      Object.entries(this.players).forEach((entry) => {
        if (entry[0] !== name) entry[1].setMallus(lines - 1);
      });
    }
  }

  updateLoose(name) {
    this.getPlayer(name).setLoose(this.settings.nbLoosers, this.settings.nbPlayers);
    this.settings.nbLoosers += 1;
    console.log('re');
    if (this.settings.nbLoosers === this.settings.nbPlayers) {
      this.settings.started = false;
      this.settings.pieces = [];
    }
  }

  // setMallus(name, mallus) {
  //   if (mallus > 1) {
  //     Object.entries(this.players).forEach((entry) => {
  //       if (entry[0] !== name) entry[1].setMallus(mallus - 1);
  //     });
  //   }
  // }
}
