import Piece from './Piece';
import { createStage, createStagePiece } from '../stage/utils';
import { flushUpdate } from '../stage/stage';
import { emitterMallus, emitterStageOther } from '../emitter/emitter';

export default class Game {
  constructor(username, roomName) {
    this.owner = username;
    this.roomName = roomName;
    this.users = [];
    this.gameStart = false;
    this.tetro = [];
    this.allStage = [];
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
  setAllStage(id, stage) {
    this.allStage.push({ login: id, stage: stage })
  }
  getAllStage() {
    return this.allStage;
  }

  startGame(id, redGame) {
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
    this.resetStage()
    emitterStageOther(redGame, this.getAllStage(), this);
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

    let userTab = this.getUserInGame();
    if (lineFull !== 0) {
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].login !== player.login) {
          userTab[i].setMallus(lineFull);
          const calcRow = 20 - userTab[i].getMallus();
          /* --- Check Game Over with mallus --- */
          if (calcRow === 0) {
            userTab[i].setLosing(true);
          }
          if (calcRow < 20) {
            const newStage = userTab[i].stage.slice(lineFull, 20);
            while (lineFull !== 0) {
              newStage.push(new Array(10).fill(['M', 'mallus']));
              lineFull--;
            }
            userTab[i].setStage(newStage);
            this.updateStage(userTab[i].getStage(), player.getLogin())
            emitterMallus(redGame.io, userTab[i]);
          }
        }
      }
    }
    emitterStageOther(redGame, this.getAllStage(), this);
  }

  updateStage(newStage, id) {
    this.allStage.forEach(res => {
      if (res.login === id) {
        res.stage = newStage;
        console.log(res.stage)
      }
    })
  }

  resetStage() {
    this.allStage.forEach(res => {
      res.stage = createStage();
    })
  }

}
