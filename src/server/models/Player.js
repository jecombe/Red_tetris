import { createStage, createStagePiece, flushUpdate, updateRows } from '../../shared/stage';

import gameHelper, { calcScore, calcLevel } from '../helpers/gameHelper';

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
        this.loose = false;
        this.win = false;
    }

    getName() {
        return this.name;
    }

    setScore(score) {
        this.score = score;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    setLevel(level) {
        this.score = level;
    }

    setLines(lines) {
        this.lines = lines;
    }

    setStage(stage) {
        this.stage = stage;
    }

    setLoose(loose) {
        this.loose = loose;
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

    setMallus(lines) {
        this.setStage(this.stage.slice(lines, 20));
        while (lines) {
            this.stage.push(new Array(10).fill(['M', 'mallus']));
            lines -= 1;
        }
        this.setStage(flushUpdate(this.piece, this.stage, this.position.x, this.position.y, false));
    }

    updatePosition(stage, piece, position) {
        this.setStage(stage);
        this.setPiece(piece);
        this.position = position;
    }

    updateCollision(stage, lines, pieces) {
        this.position = { x: 10 / 2 - 2, y: 0 };
        this.nbPiece += 1;
        this.setPiece(pieces[this.nbPiece]);
        this.setStage(flushUpdate(this.piece, stage, this.position.x, this.position.y, false));
        this.score += calcScore(this.level, lines);
        this.lines += lines;
        this.level = calcLevel(this.lines);
    }
}
