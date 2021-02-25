import { createStage, flushUpdate, checkCollision, updateRows } from '../../shared/stage';

import { calcScore, calcLevel, keys } from '../helpers/gameHelper';

export default class Player {
  constructor(name) {
    this.name = name;
    this.initPlayer();
  }

  initPlayer() {
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.mallus = 0;
    this.rank = 0;
    this.stage = createStage();
    this.piece = null;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.nbPiece = 0;
    this.dropTime = 1000;
    this.loose = false;
    this.win = false;
  }

  getName() {
    return this.name;
  }

  // setScore(score) {
  //   this.score = score;
  // }

  // setPiece(piece) {
  //   this.piece = piece;
  // }

  setLevel(level) {
    this.score = level;
  }

  // setLines(lines) {
  //   this.lines = lines;
  // }

  setStage(stage) {
    this.stage = stage;
  }

  // setLoose(loose) {
  //   this.loose = loose;
  // }

  setRank(nbLoosers, nbPlayers) {
    this.rank = nbPlayers - nbLoosers;
  }

  setPlayerNull() {
    this.collided = false;
    this.position = { x: 0, y: 0 };
    this.piece = null;
    this.index = 0;
    this.mallus = 0;
    this.lineFull = 0;
    this.losing = false;
    this.win = false;
  }

  start(piece) {
    this.initPlayer();
    this.piece = piece;
    this.stage = flushUpdate(this.piece, this.stage, this.position.x, this.position.y, false);
  }

  updateStage(position, collided) {
    const { x, y } = position;
    this.piece.form.shape.forEach((row, fy) => {
      row.forEach((value, fx) => {
        if (value !== 0) {
          this.stage[fy + y][fx + x] = [value, `${collided ? 'merged' : 'clear'}`];
        }
      });
    });
  }

  updateCollision(pieces) {
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.piece = pieces[this.nbPiece];
    this.setStage(flushUpdate(this.piece, this.stage, this.position.x, this.position.y, false));
  }

  dropTetro() {
    if (!checkCollision(this.piece, this.stage, { x: 0, y: 1 }, this.position.x, this.position.y)) {
      this.stage = flushUpdate(this.piece, this.stage, this.position.x, this.position.y + 1, false);
      this.position = { x: this.position.x, y: this.position.y + 1 };
      return { collided: false, loose: false };
    }

    const { stage, lines } = updateRows(flushUpdate(this.piece, this.stage, this.position.x, this.position.y, true));

    this.stage = stage;
    this.score += calcScore(this.level, lines);
    this.lines += lines;
    this.level = calcLevel(this.lines);
    this.nbPiece += 1;

    return {
      collided: true,
      lines,
      loose: this.position.y < 1,
    };
  }

  moveTetro(dir) {
    if (!checkCollision(this.piece, this.stage, { x: dir, y: 0 }, this.position.x, this.position.y)) {
      this.stage = flushUpdate(this.piece, this.stage, this.position.x + dir, this.position.y, false);
      this.position = { x: this.position.x + dir, y: this.position.y };

      return {
        collided: false,
        loose: false,
      };
    }

    return {
      collided: false,
      loose: false,
    };
  }

  moveTetroUp(dir) {
    // let clonedPiece = JSON.parse(JSON.stringify(this.piece));
    // clonedPiece.form.shape = rotate(clonedPiece.form.shape, dir);
    const clonedPiece = this.piece;
    // console.log(clonedPiece);
    clonedPiece.rotate(dir);
    const pos = this.position.x;
    let pos2 = this.position.x;
    let offset = 1;
    while (checkCollision(clonedPiece, this.stage, { x: 0, y: 0 }, this.position.x, this.position.y)) {
      pos2 += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPiece.form.shape[0].length) {
        clonedPiece.rotate(-dir);
        // rotate(clonedPiece.form.shape, -dir);
        pos2 = pos;
        return {
          collided: false,
          loose: false,
        };
      }
    }

    this.stage = flushUpdate(clonedPiece, this.stage, pos2, this.position.y, false);
    this.position = { x: pos2, y: this.position.y };
    this.piece = clonedPiece;
    return {
      collided: false,
      loose: false,
    };
  }

  moveDownTetro() {
    let i = 0;
    let drop = this.dropTetro(this.stage, this.piece, this.position);

    while (!drop.collided) {
      i += 1;
      drop = this.dropTetro(this.stage, this.piece, {
        x: this.position.x,
        y: this.position.y + i,
      });
    }

    // this.setStage(flushUpdate(this.piece, this.stage, this.position.x, this.position.y + i, true));
    // this.position = { x: this.position.x, y: this.position.y + i };

    return {
      collided: drop.collided,
      loose: drop.loose,
      lines: drop.lines,
    };
  }

  move(keyCode) {
    const gameAllowedKeys = [keys.KDOWN, keys.KLEFT, keys.KRIGHT, keys.KUP, keys.KSPACE];

    if (!gameAllowedKeys.includes(keyCode)) {
      throw new Error(`Key not allowed: ${keyCode}`);
    }

    switch (keyCode) {
      case keys.KDOWN:
        return this.dropTetro();
      case keys.KLEFT:
        return this.moveTetro(-1);
      case keys.KRIGHT:
        return this.moveTetro(1);
      case keys.KUP:
        return this.moveTetroUp();
      case keys.KSPACE:
        return this.moveDownTetro();
      default:
        break;
    }

    return { collided: null, loose: null };
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
}
