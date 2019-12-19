import { createStage, createStagePiece } from '../helpers/stage';
import { updateStage, printTetroStage } from '../handlers/game/stageGame';
import { checkCollision } from '../helpers/gameHelpers';
import {
  flushUpdate,
  updatePlayerPosition,
  updateStagingBeforeCollision,
  updateStagingAfterCollision,
  updatePlayerPositionCollision,

} from '../handlers/player/stagePlayer';

export const terrain = (piece, stage) => {
  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${'clear'}`,
        ];
      }
    });
  });
  return newStage;
};

const printTetro = (obj, piece) => {
  const stage = createStagePiece();
  obj.setPositionNull();
  obj.setPosition1(10 / 2 - 2, 0);
  obj.setNextPiece(terrain(piece, stage));
};


export const moveDownTetro = (redGame, objGame, objPlayer) => {
  const { io, socketClient, userlist } = redGame;
  let i = 0;
  let checkColl = false;
  while (checkColl != true) {
    i += 1;
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i });
    if (checkColl === true) {
      i -= 1;
      break;
    }
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i + 1 });
  }
  objPlayer.setStage(updatePlayerPosition(0, i, objPlayer, objGame));
  objPlayer.setIndex(objPlayer.index + 1);
  objPlayer.setStage(updateStagingBeforeCollision(objPlayer, objGame, redGame, io));
  // dispatchStage(objPlayer, userList, io, objGame)
  objPlayer.setPiece(objGame.tetro[objPlayer.index]);
  if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
  objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
  printTetro(objPlayer, objGame.tetro[objPlayer.index + 1]);
};

export const dropTetro = (objPlayer, objGame, redGame) => {
  const { io, socketClient, userlist } = redGame;
  if (!checkCollision(objPlayer, objPlayer.stage, { x: 0, y: 1 })) {
    objPlayer.setStage(updatePlayerPosition(0, 1, objPlayer, objGame));
  } else {
    objPlayer.setIndex(objPlayer.index + 1);
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer, objGame, redGame, io));
    // dispatchStage(objPlayer, userList, io, objGame)
    objPlayer.setPiece(objGame.tetro[objPlayer.index]);
    if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
    printTetro(objPlayer, objGame.tetro[objPlayer.index + 1]);
  }
};

const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};

export const moveUpTetro = (player, dir) => {
  const clonedPlayer = JSON.parse(JSON.stringify(player));
  clonedPlayer.piece.form.shape = rotate(clonedPlayer.piece.form.shape, dir);
  const pos = player.pos.x;
  let offset = 1;
  while (checkCollision(clonedPlayer, player.stage, { x: 0, y: 0 })) {
    clonedPlayer.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > clonedPlayer.piece.form.shape[0].length) {
      rotate(clonedPlayer.piece.form.shape, -dir);
      clonedPlayer.pos.x = pos;
      return;
    }
  }
  player.setPositionNull();
  player.setPiece(clonedPlayer.piece);
  player.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y);
  player.setStage(flushUpdate(player.piece, player));
};

export const moveTetro = (game, player, pos) => {
  if (!checkCollision(player, player.stage, { x: pos, y: 0 })) {
    player.setStage(updatePlayerPosition(pos, 0, player, game));
  } else {
    player.setStage(updatePlayerPositionCollision(0, 0, player, game));
  }
};
