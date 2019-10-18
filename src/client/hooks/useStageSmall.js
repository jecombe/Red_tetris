
import { useState, useEffect } from 'react';
import { createStageSmall } from '../helpers/gameHelpers';

export const useStageSmall = (player, resetPlayerSmall) => {
  const [stage_small, setStageSmall] = useState(createStageSmall());
  console.log('useStage');

  useEffect(() => {
    const updateStage = (prevStage) => {
      console.log('updateStage', prevStage, '================+> ', player);
      // First flush the stage
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

      console.log('-----------------------+> ', player);
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
      // Then check if we collided
      if (player.collided) {
        resetPlayerSmall();
      }

      return newStage;
    };

    setStageSmall((prev) => updateStage(prev));
  }, [player, resetPlayerSmall]);

  return [stage_small, setStageSmall];
};
