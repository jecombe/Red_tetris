import { checkCollision } from '../../helpers/gameHelpers';
import {
  flushUpdate, updatePlayerPosition, updateStagingBeforeCollision,
  updateStagingAfterCollision, updatePlayerPositionCollision, updateRows
} from './stagePlayer';
import { createStagePiece } from '../../stage';

const moveTetro = (position, objUser, objGame) => {
  if (!checkCollision(objUser, objUser.stage, { x: position, y: 0 })) objUser.setStage(updatePlayerPosition(position, 0, objUser, objGame));
  else objUser.setStage(updatePlayerPositionCollision(0, 0, objUser, objGame));
};


const terrain = (piece, stage) => {
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
  return newStage

}
const printTetro = (obj, piece) => {
  const stage = createStagePiece();
  obj.setPositionNull();
  obj.setPosition1(10 / 2 - 2, 0);
  obj.setNextPiece(terrain(piece, stage));
};

const userInGameExceptActua = (userTab, userActual) => {
  var index = userTab.indexOf(userActual);
  var copie = new Array();
  for (var i = 0; i < userTab.length; i++) {
    copie[i] = userTab[i];
  }
  copie.splice(index, 1);
  return copie

}

const replaceOtherStage = (objPlayer, usernameOther, obj) => {
  let index = objPlayer.peopleSpectre.indexOf(usernameOther)
  obj.otherStage[index] = objPlayer.stage
}

const sendSpectreToOther = (userList, usernameOther, i, objPlayer, io) => {
  userList.find((obj) => {
    if (obj.login == usernameOther) {
      replaceOtherStage(objPlayer, usernameOther, obj)
      io.to(`${obj.getIdSocket()}`).emit('otherStage', {
        otherStage: obj.otherStage
      });
    }
  });
};

const dispatchStage = (objPlayer, userList, io, objGame) => {
  const tabUser = userInGameExceptActua(objGame.getUserInGame(), objPlayer.getLogin())
  for (var i = 0; i < tabUser.length; i++) {
    sendSpectreToOther(userList, tabUser[i], i, objPlayer, io)
  }
}

const dropTetro = (objPlayer, objGame, userList, io, socket) => {
  if (!checkCollision(objPlayer, objPlayer.stage, { x: 0, y: 1 })) {
    objPlayer.setStage(updatePlayerPosition(0, 1, objPlayer, objGame));

  } else {
    objPlayer.setIndex(objPlayer.index + 1);
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer));
    objPlayer.setStage(updateRows(objPlayer.stage, objPlayer, objGame, userList, io));
    dispatchStage(objPlayer, userList, io, objGame)

    objPlayer.setPiece(objGame.tetro[objPlayer.index]);
    if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
    printTetro(objPlayer, objGame.tetro[objPlayer.index + 1])
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
  while (checkCollision(clonedPlayer, objPlayer.stage, { x: 0, y: 0 })) {
    clonedPlayer.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > clonedPlayer.piece.form.shape[0].length) {
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

/* TO DO => renvoyer la prochaine piece et diffuser les spectre comme la fonction drop */
const moveTetroDown = (objPlayer, objGame) => {
  let i = 0;
  let checkColl = false;
  while (checkColl != true) {
    i += 1;
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i });
    checkColl = checkCollision(objPlayer, objPlayer.stage, { x: 0, y: i + 1 });
  }
  objPlayer.setStage(updatePlayerPosition(0, i, objPlayer, objGame));
  objPlayer.setIndex(objPlayer.index + 1);
  objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer));
  objPlayer.setPiece(objGame.tetro[objPlayer.index]);
  if (!objGame.tetro[objPlayer.index + 1]) objGame.setTetro();
  objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer));
};


/* --- check heycode of keyBoard --- */
export const movementPlayer = (keyCode, objGame, objUser, userList, io, socket) => {
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
    dropTetro(objUser, objGame, userList, io, socket);
    console.log('BAS');
  }
};
