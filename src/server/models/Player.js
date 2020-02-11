import { createStage, createStagePiece } from '../stage/utils';

import { flushUpdate, updateStagingAfterCollision, updateStagingBeforeCollision } from '../stage/stage';
import { checkCollision } from '../helpers/gameHelpers';
import { rotate, dispatchStage2 } from '../actions/move'
import { dispatchStageLogin } from '../actions/login'

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

  getIdSocket() {
    return this.idSocket;
  }
  getPiece()
  {
    return this.piece;
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
    this.notLosing = number;
  }

  setNoLosing2() {
    this.notLosing -= 1;
  }

  setWin() {
    this.win = true;
  }

  initPlayer(len, pieceStart, newStage) {
    this.setPositionNull();
    this.setNoLosing(len);
    this.setPlayerNull();
    this.setPiece(pieceStart);
    this.setPosition(10 / 2 - 2, 0);
    this.setPositionNextTetro(10 / 2 - 2, 0);
    this.setStage(newStage);
  }

  updatePlayerStage(piece, newStage, obj) {
    piece.form.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + obj.pos.y][x + obj.pos.x] = [
            value,
            `${obj.collided ? 'merged' : 'clear'}`,
          ];
        }
      });
    });

    return newStage;
  }

  moveUpTetro(dir) {

    const clonedPlayer = JSON.parse(JSON.stringify(this));
    clonedPlayer.piece.form.shape = rotate(clonedPlayer.piece.form.shape, dir);
    const pos = this.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, this.stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.piece.form.shape[0].length) {
        rotate(clonedPlayer.piece.form.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    this.setPositionNull();
    this.setPiece(clonedPlayer.piece);
    this.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y);
    this.setStage(flushUpdate(this.piece, this, this.stage));

  }
  dropTetro(game, redGame) {
    if (!checkCollision(this, this.stage, { x: 0, y: 1 })) {
      this.setPosition(0, 1);
      this.setStage(flushUpdate(this.piece, this, this.stage));
    } else {
      /* --- Check Game Over --- */
      if (this.pos.y < 1) {
        this.setLosing(true);
        if (!this.peopleSpectre.length) {
          this.setNoLosing2();
        }
      }
      this.setIndex(this.index + 1);
      this.setStage(updateStagingBeforeCollision(this, game, redGame));
      /* --- DISPATCH STAGE TO OTHER USER --- */
      if (this.peopleSpectre.length) {
        dispatchStage2(this, redGame.io, game);
      }
      this.setPiece(game.tetro[this.index]);
      if (!game.tetro[this.index + 1]) game.setTetro();
      this.setStage(updateStagingAfterCollision(this.piece, this));
      this.setNextPiece(flushUpdate(game.tetro[this.index + 1], this, createStagePiece()));
    }

  }

  moveTetro(game, pos) {
    if (!checkCollision(this, this.stage, { x: pos, y: 0 })) {
      this.setPosition(pos, 0);
      this.setStage(flushUpdate(this.piece, this, this.stage));
    } else {
      this.setPosition(0, 0);
      this.setStage(flushUpdate(this.piece, this, this.stage));
    }
  }

  moveDownTetro(redGame, game) {
    let i = 0;
    let checkColl = false;
    while (checkColl !== true) {
      i += 1;
      checkColl = checkCollision(this, this.stage, { x: 0, y: i });
      if (checkColl === true) {
        /* --- Check Game Over --- */
        if (this.pos.y < 1) {
          console.log('GAME OVER');
          this.setLosing(true);
          if (!this.peopleSpectre.length) {
            this.setNoLosing2();
          }
        }
        i -= 1;
        break;
      }
      checkColl = checkCollision(this, this.stage, { x: 0, y: i + 1 });
    }

    this.setPosition(0, i);
    this.setStage(flushUpdate(this.piece, this, this.stage));
    this.setIndex(this.index + 1);
    this.setStage(updateStagingBeforeCollision(this, game, redGame));
    /* --- DISPATCH STAGE TO OTHER USER --- */
    if (this.peopleSpectre.length) {
      dispatchStage2(this, redGame.io, game);
    }
    this.setPiece(game.tetro[this.index]);
    if (!game.tetro[this.index + 1]) game.setTetro();
    this.setStage(updateStagingAfterCollision(this.piece, this));
    this.setNextPiece(flushUpdate(game.tetro[this.index + 1], this, createStagePiece()));
  };

  logout(redGame) {
    if (this.username === '')
      return;
    const game = redGame.getGame(this.room);
    game.unsetPlayer(this.getIdSocket());
    if (game.users.length !== 0) {
      game.setPlayerOwner(game.users[0]);
      game.users[0].setOwner();
    } else {
      redGame.unsetGame(this.room);
    }
    dispatchStageLogin(this, redGame, game);
    redGame.unsetPlayer(this.idSocket);
  }

  positionTetro(keyCode, game, redGame) {
    if (this.getLosing() === false) {
      if (keyCode === 40) {
        this.dropTetro(game, redGame);
      }
      else if (keyCode === 37) {
        this.moveTetro(game, -1);
      } else if (keyCode === 38) {
        this.moveUpTetro(1);
      } else if (keyCode === 39) {
        this.moveTetro(game, 1);
      }
      // Probleme avec moveDownTetro car userlist doit etre remplace par players de redGame
      else if (keyCode === 32) {
        this.moveDownTetro(redGame, game);
      }
    }
  }
}
