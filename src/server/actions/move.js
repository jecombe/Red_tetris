import { createStagePiece } from '../stage/utils';
import { checkCollision } from '../helpers/gameHelpers';
import {
  flushUpdate,
  updateStagingBeforeCollision,
  updateStagingAfterCollision,
} from '../stage/stage';
import { emitterStageOther } from '../emitter/emitter'


/*= ============================= DISPATCH SPECTRE ============================== */
const replaceOtherStage = (objPlayer, objOther) => {
  const index = objOther.peopleSpectre.indexOf(objPlayer.login);
  console.log('INDEX ', index);
  let id = 0;
  objOther.otherStage[index] = objPlayer.stage;

  objOther.otherStage.map((newStage) => {
    const nouv = newStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    objOther.otherStage[id] = nouv;
    id += 1;
  });
};


const sendSpectreToOther = (userList, usernameOther, objPlayer, io) => {
  userList.find((obj) => {
    if (obj.login === usernameOther) {
      replaceOtherStage(objPlayer, obj);
      if (objPlayer.losing === true) {
        obj.setNoLosing2();
        if (obj.notLosing === 0)
        {
          console.log('JOUEUR GAGNANT ', obj.login);
          obj.setWin();
        }
      }
      emitterStageOther(io, obj);
    }
  });
};

export const dispatchStage = (objPlayer, io, objGame) => {
  const tabUser = objPlayer.getPeopleSpectre();

  for (let i = 0; i < tabUser.length; i++) {
    sendSpectreToOther(objGame.getUserInGame(), tabUser[i], objPlayer, io);
  }
};
/*= ============================= DISPATCH SPECTRE ============================== */


export const moveDownTetro = (redGame, objGame, objPlayer) => {
  let i = 0;
  let checkColl = false;
  while (checkColl !== true) {
    i += 1;
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i });
    if (checkColl === true) {
      /* --- Check Game Over --- */
      if (objPlayer.pos.y < 1) {
        console.log('GAME OVER');
        objPlayer.setLosing(true);
        if (!objPlayer.peopleSpectre.length) {
          objPlayer.setNoLosing2();
        }
      }
      i -= 1;
      break;
    }
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i + 1 });
  }

  objPlayer.setPosition(0, i);
  objPlayer.setStage(flushUpdate(objPlayer.piece, objPlayer, objPlayer.stage));
  objPlayer.setIndex(objPlayer.index + 1);
  objPlayer.setStage(updateStagingBeforeCollision(objPlayer, objGame, redGame));
  /* --- DISPATCH STAGE TO OTHER USER --- */
  if (objPlayer.peopleSpectre.length) {
    dispatchStage(objPlayer, redGame.io, objGame);
  }
  objPlayer.setPiece(objGame.tetro[objPlayer.index]);
  if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
  objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
  objPlayer.setNextPiece(flushUpdate(objGame.tetro[objPlayer.index + 1], objPlayer, createStagePiece()));
};

export const dropTetro = (objPlayer, objGame, redGame) => {
  if (!checkCollision(objPlayer, objPlayer.stage, { x: 0, y: 1 })) {
    objPlayer.setPosition(0, 1);
    objPlayer.setStage(flushUpdate(objPlayer.piece, objPlayer, objPlayer.stage));
  } else {
    /* --- Check Game Over --- */
    if (objPlayer.pos.y < 1) {
      objPlayer.setLosing(true);
      if (!objPlayer.peopleSpectre.length) {
        objPlayer.setNoLosing2();
      }
    }
    objPlayer.setIndex(objPlayer.index + 1);
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer, objGame, redGame));
    /* --- DISPATCH STAGE TO OTHER USER --- */
    if (objPlayer.peopleSpectre.length) {
      dispatchStage(objPlayer, redGame.io, objGame);
    }
    objPlayer.setPiece(objGame.tetro[objPlayer.index]);
    if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
    objPlayer.setNextPiece(flushUpdate(objGame.tetro[objPlayer.index + 1], objPlayer, createStagePiece()));
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
  player.setStage(flushUpdate(player.piece, player, player.stage));
};

export const moveTetro = (game, player, pos) => {
  if (!checkCollision(player, player.stage, { x: pos, y: 0 })) {
    player.setPosition(pos, 0);
    player.setStage(flushUpdate(player.piece, player, player.stage));
  } else {
    player.setPosition(0, 0);
    player.setStage(flushUpdate(player.piece, player, player.stage));
  }
};
