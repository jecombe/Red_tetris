import { checkCollision } from '../../helpers/gameHelpers';
import {
  flushUpdate, updatePlayerPosition, updateStagingBeforeCollision,
  updateStagingAfterCollision, updatePlayerPositionCollision, updateRows
} from './stagePlayer';

const moveTetro = (position, objUser, objGame) => {
  if (!checkCollision(objUser.piece, objUser, { x: position, y: 0 })) objUser.setStage(updatePlayerPosition(position, 0, objUser, objGame));
  else objUser.setStage(updatePlayerPositionCollision(0, 0, objUser, objGame));
};

const dropTetro = (objPlayer, objGame) => {
  if (!checkCollision(objPlayer.piece, objPlayer, { x: 0, y: 1 })) {
    objPlayer.setStage(updatePlayerPosition(0, 1, objPlayer, objGame));
  } else {
    objPlayer.setIndex(objPlayer.index + 1);
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer));
    objPlayer.setStage(updateRows(objPlayer.stage));
    objPlayer.setPiece(objGame.tetro[objPlayer.index]);
    if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
  }
};

const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};

const playerRotate = (objPlayer, dir) => {
  const clonedPlayer = JSON.parse(JSON.stringify(objPlayer));
  clonedPlayer.piece.form.shape = rotate(clonedPlayer.piece.form.shape, dir);
  const pos = objPlayer.pos.x;
  let offset = 1;
  const checkColl = false;

  while (checkCollision(clonedPlayer.piece, objPlayer, { x: 0, y: 0 })) {
    clonedPlayer.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > clonedPlayer.piece.form.shape[0].length) {
      console.log('2222222222222');
      rotate(clonedPlayer.piece.form.shape, -dir);
      clonedPlayer.pos.x = pos;
      return;
    }
  }
  objPlayer.setPositionNull();
  objPlayer.setPiece(clonedPlayer.piece);
  objPlayer.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y);
  objPlayer.setStage(flushUpdate(objPlayer.piece, objPlayer));
};

const moveTetroDown = (objPlayer, objGame) => {
  let i = 0;
  let checkColl = false;
  while (checkColl != true) {
    i += 1;
    checkColl = checkCollision(objPlayer.piece, objPlayer, { x: 0, y: i });
    checkColl = checkCollision(objPlayer.piece, objPlayer, { x: 0, y: i + 1 });
  }
  objPlayer.setStage(updatePlayerPosition(0, i, objPlayer, objGame));
  objPlayer.setIndex(objPlayer.index + 1);
  objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer));
  objPlayer.setPiece(objGame.tetro[objPlayer.index]);
  if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
  objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
};

export const movementPlayer = (keyCode, objGame, objUser) => {
  if (keyCode === 32) {
    moveTetroDown(objUser, objGame);
  } else if (keyCode === 37) {
    console.log('LEFT');
    moveTetro(-1, objUser, objGame);
  } else if (keyCode === 38) {
    playerRotate(objUser, 1);
    console.log('HAUT');
  } else if (keyCode === 39) {
    console.log('RIGTH');
    moveTetro(1, objUser, objGame);
  } else if (keyCode === 40) {
    dropTetro(objUser, objGame);
    console.log('BAS');
  }
};
