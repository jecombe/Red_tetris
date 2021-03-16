import { createStage, createStagePiece, flushUpdate, checkCollision, STAGE_WIDTH } from '../../shared/stage';

import { calcScore, keys } from '../helpers/gameHelper';

export default class Player {
  constructor(name) {
    this.name = name;
    this.initPlayer();
  }

  initPlayer() {
    this.score = 0;
    this.lines = 0;
    this.mallus = 0;
    this.rank = 0;
    this.stage = createStage();
    this.stagePiece = [createStagePiece(), createStagePiece()];
    this.piece = null;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.nbPiece = 0;
    this.dropTime = 0;
    this.collided = false;
    this.loose = false;
    this.win = false;
  }

  getName() {
    return this.name;
  }

  // setScore(score) {
  //   this.score = score;
  // }

  setPiece(piece) {
    this.piece = piece;
  }

  // setLines(lines) {
  //   this.lines = lines;
  // }

  /* Stage */

  setStage(stage) {
    this.stage = stage;
  }

  setUpdateStage() {
    this.piece.form.shape.forEach((row, fy) => {
      row.forEach((value, fx) => {
        if (value !== 0) {
          this.stage[fy + this.position.y][fx + this.position.x] = [value, `${this.collided ? 'merged' : 'clear'}`];
        }
      });
    });
  }

  setFlushUpdate() {
    this.stage = this.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    this.setUpdateStage();
  }

  setUpdateRows() {
    // Pour la hauteur verifie si une ligne est pleine
    let lines = 0;

    this.stage.forEach((row) => {
      const isFull = row.every((cell) => cell[1] === 'merged');
      if (isFull === true) {
        lines += 1;
        // objPlayer.setLineFull();
        // Check l'index de la ligne pleine;
        const index = this.stage.indexOf(row);
        // Met la ligne a 0
        row.fill([0, 'clear']);
        // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
        this.stage.splice(index, 1);
        // Ajoute au debut du tableau un nouveau tableau de 10 a 0
        this.stage.unshift(new Array(STAGE_WIDTH).fill([0, 'clear']));
        // setMallusToPlayers(objGame.getPlayers(), objPlayer.getLogin(), redGame.socketClient, objGame, objPlayer);
      }
    });
    return { lines };
  }

  /* StagePiece */

  setStagePiece(index, piece) {
    this.stagePiece[index] = createStagePiece();

    piece.form.shape.forEach((row, fy) => {
      row.forEach((value, fx) => {
        if (value !== 0) {
          this.stagePiece[index][fy][fx] = [value, 'merged'];
        }
      });
    });
  }

  /* Piece */

  dropTetro() {
    if (!checkCollision(this.piece, this.stage, { x: 0, y: 1 }, this.position.x, this.position.y)) {
      this.position = { x: this.position.x, y: this.position.y + 1 };
    } else {
      this.collided = true;
      this.loose = this.position.y < 1;
    }
  }

  moveTetro(dir) {
    if (!checkCollision(this.piece, this.stage, { x: dir, y: 0 }, this.position.x, this.position.y)) {
      this.position = { x: this.position.x + dir, y: this.position.y };
    }
  }

  moveTetroUp(dir) {
    const pos = this.position.x;
    let offset = 1;

    this.piece.rotate(dir);
    while (checkCollision(this.piece, this.stage, { x: 0, y: 0 }, this.position.x, this.position.y)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.form.shape[0].length) {
        this.piece.rotate(-dir);
        this.position.x = pos;
      }
    }
  }

  moveDownTetro() {
    let i = 0;

    this.dropTetro(this.stage, this.piece, this.position);
    while (!this.collided) {
      i += 1;
      this.dropTetro(this.stage, this.piece, {
        x: this.position.x,
        y: this.position.y + i,
      });
    }
  }

  getCollided() {
    return this.collided;
  }

  getFinish() {
    return this.loose || this.win;
  }

  setRank(nbLoosers, nbPlayers) {
    this.rank = nbPlayers - nbLoosers;
  }

  /* Game */

  setStart({ pieces, dropTime }) {
    this.initPlayer();
    [this.piece] = pieces;
    this.setStagePiece(0, pieces[this.nbPiece + 1]);
    this.setStagePiece(1, pieces[this.nbPiece + 2]);
    this.dropTime = dropTime;
    this.setFlushUpdate();
  }

  setMove(keyCode) {
    if (this.loose === true || this.win === true) throw new Error("You can't play");

    if (keyCode === keys.KDOWN) this.dropTetro();
    if (keyCode === keys.KLEFT) this.moveTetro(-1);
    if (keyCode === keys.KRIGHT) this.moveTetro(1);
    if (keyCode === keys.KUP) this.moveTetroUp();
    if (keyCode === keys.KSPACE) this.moveDownTetro();

    this.setFlushUpdate();

    return { collided: null, loose: null };
  }

  setCollision(pieces) {
    this.setFlushUpdate();
    const { lines } = this.setUpdateRows();
    this.collided = false;

    this.score += calcScore(this.level, lines);
    this.lines += lines;
    this.nbPiece += 1;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.piece = pieces[this.nbPiece];
    this.setStagePiece(0, pieces[this.nbPiece + 1]);
    this.setStagePiece(1, pieces[this.nbPiece + 2]);

    // this.setFlushUpdate();
    return { lines };
  }

  setMallus(lines) {
    let i = lines;

    this.mallus += lines;
    this.setStage(this.stage.slice(lines, 20));
    while (i) {
      this.stage.push(new Array(10).fill(['M', 'mallus']));
      i -= 1;
    }
    this.setStage(flushUpdate(this.piece, this.stage, this.position.x, this.position.y, false));
  }

  setLoose(nbLoosers, nbPlayers) {
    this.loose = false;
    this.dropTime = 0;
    this.rank = nbPlayers - nbLoosers;
    if (this.rank === 1) this.win = true;
    else this.loose = true;
  }
}
