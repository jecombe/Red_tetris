import { is_full } from './utils';
import { objUser } from '../actions/utils';

const updateStage = (piece, newStage, obj) => {
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
};


const updateStage1 = (piece, newStage, obj) => {
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + obj.pos1.y][x + obj.pos1.x] = [
          value,
          `${obj.collided ? 'merged' : 'clear'}`,
        ];
      }
    });
  });
  return newStage;
};


export const flushUpdate = (piece, obj, objGame) => {
  const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  return updateStage(piece, newStage, obj);
};

export const updatePlayerPosition = (x, y, obj) => {
  obj.setPosition(x, y);
  return flushUpdate(obj.piece, obj);
};


export const updateStagingBeforeCollision = (objPlayer, objGame, redGame, io) => {
  objPlayer.setCollidedTrue();
  const newStage = updateStage(objPlayer.piece, objPlayer.stage, objPlayer)

  return (updateRows(newStage, objPlayer, objGame, redGame, io))
};
/*
export const updateStagingBeforeCollision = (piece, obj) => {
  obj.setCollidedTrue();
  return updateStage(piece, obj.stage, obj);
};
*/
export const updateStagingAfterCollision = (piece, obj) => {
  obj.setPositionNull();
  obj.setCollidedFalse();
  obj.setPosition(10 / 2 - 2, 0);
  return updateStage(piece, obj.stage, obj);
};

export const updateStagingAfterCollision1 = (piece, obj) => {
  obj.setPositionNull1();
  obj.setPosition1(10 / 2 - 2, 0);
  return updateStage1(piece, obj.stage, obj);
};

export const updatePlayerPositionCollision = (x, y, obj, objGame) => {
  obj.setPosition(x, y);
  return flushUpdate(obj.piece, obj, 0);
};

const userInGameExceptActual = (userTab, userActual) => {
  const index = userTab.indexOf(userActual);
  const copie = new Array();
  for (let i = 0; i < userTab.length; i++) {
    copie[i] = userTab[i];
  }
  copie.splice(index, 1);
  return copie;
};

const updateStageMallus = (objPlayer, io) => {
  const calcRow = 20 - objPlayer.getMallus();

  if (calcRow < 20) {
    objPlayer.stage[calcRow] = new Array(10).fill([0, 'mallus']);

    const socket = objPlayer.getIdSocket();

    io.to(`${socket}`).emit('stageMallus', {
      newStage: objPlayer.stage,
    });
  }
};
const objPlayer1 = (userList, username, io) => {
  let objPlayer;
  userList.find((obj) => {
    if (obj.login == username) {
      obj.setMallus();
      updateStageMallus(obj, io);
    }
  });
};
const setMallusToPlayers = (objGame, userActual, userList, io) => {
  const tabUser = userInGameExceptActual(objGame.getUserInGame(), userActual);

  for (let i = 0; i < tabUser.length; i++) {
    objPlayer1(userList, tabUser[i], io);
  }
};
export const updateRows = (newStage, objPlayer, objGame, redGame, io) => {
  // Pour la hauteur verifie si une ligne est pleine
  newStage.forEach((row) => {
    const full_line = row.every(is_full);
    if (full_line === true) {
      objPlayer.setLineFull();
      // Check l'index de la ligne pleine;
      const index = newStage.indexOf(row);
      // Met la ligne a 0
      row.fill([0, 'clear']);
      // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
      newStage.splice(index, 1);
      // Ajoute au debut du tableau un nouveau tableau de 10 a 0
      newStage.unshift(new Array(10).fill([0, 'clear']));
      //setMallusToPlayers(objGame, objPlayer.getLogin(), userList, io);
    }
  });
  return (newStage);
};
