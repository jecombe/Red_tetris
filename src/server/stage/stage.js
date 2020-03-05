import { isFull, updateStage } from './utils';

export const flushUpdate = (piece, stage, x, y, collided) => updateStage(piece, stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), x, y, collided);

export const updateRows = (newStage, objGame, objPlayer, redGame) => {
  // Pour la hauteur verifie si une ligne est pleine
let lineFull = 0;
  newStage.forEach((row) => {
    const fullLine = row.every(isFull);
    if (fullLine === true) {
      lineFull++;
     // objPlayer.setLineFull();

      // Check l'index de la ligne pleine;
      const index = newStage.indexOf(row);
      // Met la ligne a 0
      row.fill([0, 'clear']);
      // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
      newStage.splice(index, 1);
      // Ajoute au debut du tableau un nouveau tableau de 10 a 0
      newStage.unshift(new Array(10).fill([0, 'clear']));
     //setMallusToPlayers(objGame.getUserInGame(), objPlayer.getLogin(), redGame.socketClient, objGame, objPlayer);
    }
  });
  return ({stage: newStage, lineFull: lineFull});
};
