
import { useState, useEffect } from 'react';
import { createStage } from '../helpers/gameHelpers';


function is_full(currentValue) {
  return (currentValue[1] === 'merged');
}
export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  const [clear, setClearRows] = useState(0);

  useEffect(() => {
    setClearRows(0);

    const updateRows = (newStage) => {
    // Pour la hauteur verifie si une ligne est pleine
      newStage.forEach((row) => {
        const full_line = row.every(is_full);
        if (full_line === true) {
          // Check l'index de la ligne pleine;
          const index = newStage.indexOf(row);
          // Met la ligne a 0
          row.fill([0, 'clear']);
          // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
          newStage.splice(index, 1);
          // Ajoute au debut du tableau un nouveau tableau de 10 a 0
          newStage.unshift(new Array(10).fill([0, 'clear']));
        }
      });

      return (newStage);
    };

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      if (player.collided) {
        resetPlayer();
        return updateRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, setClearRows];
};
