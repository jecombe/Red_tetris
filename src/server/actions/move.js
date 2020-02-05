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
  const index = objOther.peopleSpectre.indexOf(objPlayer.username);
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
    if (obj.username === usernameOther) {
      replaceOtherStage(objPlayer, obj);
      if (objPlayer.losing === true) {
        obj.setNoLosing2();
        if (obj.notLosing === 0)
        {
          console.log('JOUEUR GAGNANT ', obj.username);
          obj.setWin();
        }
      }
      emitterStageOther(io, obj);
    }
  });
};

export const dispatchStage2 = (objPlayer, io, objGame) => {
  const tabUser = objPlayer.getPeopleSpectre();

  for (let i = 0; i < tabUser.length; i++) {
    sendSpectreToOther(objGame.getUserInGame(), tabUser[i], objPlayer, io);
  }
};

export const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};
