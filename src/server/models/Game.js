import { array } from 'prop-types';
import Piece from './Piece';
import { createStage, createStagePiece, flushUpdate } from '../../shared/stage';

import { emitterMallus, emitterStageOther, emitterWinner } from '../actions/emitter';

export default class Game {
  constructor(username, roomName) {
    this.owner = username;
    this.roomName = roomName;
    this.users = [];
    this.copyUser = [];
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

  getAllStage() {
    const tabRes = [];
    this.users.forEach((res) => {
      tabRes.push({
        login: res.login, stage: res.stage, mallus: res.mallus, lineFull: res.lineFull, playerGameOver: res.gameOver,
      });
    });
    return tabRes;
  }

  setCopyUser() {
    this.copyUser = Array.from(this.users);
  }

  startGame(id, redGame) {
    if (!this.getPlayer(id).isOwner()) return false;
    this.setTetroNull();
    this.setGameStart();
    this.users.map((user) => {
      user.initPlayer(this.users.length, this.getPieceStart());
      user.setNextPiece(flushUpdate(this.getNextPieceStart(), createStagePiece(), user.getPositionX(), user.getPositionY(), false));
      return user;
    });
    emitterStageOther(redGame, this.getAllStage(), this);
    this.setCopyUser();
    return ({
      newStage: createStage(),
      nextPiece: flushUpdate(this.getNextPieceStart(), createStagePiece(), this.users[0].getPositionX(), this.users[0].getPositionY(), false),
      otherNotLosing: 1,
      position: { x: 10 / 2 - 2, y: 0 },
      collided: false,
      piece: this.getPieceStart(),

    });
  }

  setMallusToPlayers(redGame, lineFull, player) {
    const userTab = this.getUserInGame();
    if (lineFull !== 0) {
      for (let i = 0; i < userTab.length; i++) {
        let lineFullTemp = lineFull;
        if (userTab[i].login !== player.login) {
          userTab[i].setMallus(lineFullTemp);
          const calcRow = 20 - userTab[i].getMallus();
          /* --- Check Game Over with mallus --- */
          if (calcRow === 0) {
            userTab[i].setLosing(true);
          }
          if (calcRow < 20) {
            const newStage = userTab[i].stage.slice(lineFullTemp, 20);
            while (lineFullTemp !== 0) {
              newStage.push(new Array(10).fill(['M', 'mallus']));
              lineFullTemp--;
            }
            userTab[i].setStage(newStage);
            emitterMallus(redGame.io, userTab[i]);
          }
        }
      }
    }
    emitterStageOther(redGame, this.getAllStage(), this);
  }

  checkUserWin(redGame) {
    if (this.copyUser.length === 1) {
      emitterWinner(this.copyUser[0], redGame);
    }
  }

  deleteUser(socketId) {
    const index = this.copyUser.findIndex((user) => user.idSocket === socketId);
    this.copyUser.splice(index, 1);
  }
}
