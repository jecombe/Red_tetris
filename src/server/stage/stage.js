import { isFull, updateStage, updateStage2 } from './utils';
import { emitterMallus, emitterStageOther } from '../emitter/emitter';


export const flushUpdate = (piece, stage, x, y, collided) => updateStage(piece, stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), x, y, collided);
export const flushUpdate2 = (piece, stage, x, y, collided) => updateStage2(piece, stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), x, y, collided);

const replaceOtherStage = (objPlayer, objOther) => {
  const index = objPlayer.peopleSpectre.indexOf(objOther.login);
  console.log('INDEX ', index);
  let id = 0;
  objPlayer.otherStage[index] = objOther.stage;

  objPlayer.otherStage.map((newStage) => {
    const nouv = newStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    objPlayer.otherStage[id] = nouv;
    id += 1;
  });
};


const sendSpectreToOther = (tabUser, objPlayer, io, objOther) => {
  objOther.forEach((element) => {
    if (element.login !== objPlayer.login) {
      replaceOtherStage(objPlayer, element);
    }
  });
  emitterStageOther(io, objPlayer);
};

export const dispatchStage = (objPlayer, io, objGame) => {
  const tabUser = objPlayer.getPeopleSpectre();
  sendSpectreToOther(tabUser, objPlayer, io, objGame.getUserInGame());
};

const setMallusToPlayers = (userTab, userActual, io, objGame, objPlayer) => {
  for (let i = 0; i < userTab.length; i++) {
    if (userTab[i].login !== userActual) {
      userTab[i].setMallus();
      const calcRow = 20 - userTab[i].getMallus();
      /* --- Check Game Over with mallus --- */
      if (calcRow === 0) {
        console.log('GAME OVER MALLUS');
        userTab[i].setLosing(true);
      }
      if (calcRow < 20) {
        const newStage = userTab[i].stage.slice(1, 20);
        newStage.push(new Array(10).fill(['M', 'mallus']));
        userTab[i].setStage(newStage);
        emitterMallus(io, userTab[i]);
      }
    }
  }
  dispatchStage(objPlayer, io, objGame);
};


export const updateRows = (newStage) => {
  // Pour la hauteur verifie si une ligne est pleine
  newStage.forEach((row) => {
    const fullLine = row.every(isFull);
    if (fullLine === true) {
     // objPlayer.setLineFull();

      // Check l'index de la ligne pleine;
      const index = newStage.indexOf(row);
      // Met la ligne a 0
      row.fill([0, 'clear']);
      // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
      newStage.splice(index, 1);
      // Ajoute au debut du tableau un nouveau tableau de 10 a 0
      newStage.unshift(new Array(10).fill([0, 'clear']));
     /// setMallusToPlayers(objGame.getUserInGame(), objPlayer.getLogin(), redGame.socketServer, objGame, objPlayer);
    }
  });
  return (newStage);
};
