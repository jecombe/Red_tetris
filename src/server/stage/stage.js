import { is_full, updateStage, userInGameExceptActual } from './utils';
import { emitterMallus } from '../emitter/emitter';


export const flushUpdate = (piece, obj, stage) => updateStage(piece, stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), obj);

const setMallusToPlayers = (userTab, userActual, io) => {
  for (let i = 0; i < userTab.length; i++) {
    if (userTab[i].login !== userActual) {
      userTab[i].setMallus();
      const calcRow = 20 - userTab[i].getMallus();
      if (calcRow < 20) {
        userTab[i].stage.shift();
        userTab[i].stage.push(new Array(10).fill(['M', 'mallus']));
        emitterMallus(io, userTab[i]);
      }
    }
  }
};

export const updateRows = (newStage, objPlayer, objGame, redGame) => {
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
      setMallusToPlayers(objGame.getUserInGame(), objPlayer.getLogin(), redGame.io);
    }
  });
  return (newStage);
};

export const updateStagingBeforeCollision = (objPlayer, objGame, redGame) => {
  objPlayer.setCollidedTrue();
  return (updateRows(updateStage(objPlayer.piece, objPlayer.stage, objPlayer), objPlayer, objGame, redGame));
};

export const updateStagingAfterCollision = (piece, obj) => {
  obj.setPositionNull();
  obj.setCollidedFalse();
  obj.setPosition(10 / 2 - 2, 0);
  return updateStage(piece, obj.stage, obj);
};
