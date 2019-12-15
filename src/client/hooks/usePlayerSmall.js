import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../components/tetrominos';
import { STAGE_WIDTH_SMALL } from '../helpers/gameHelpers';

export const usePlayerSmall = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayerSmall = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH_SMALL / 2 - 2, y: 1 },
      tetromino: randomTetromino().shape,
      tetrominoNext: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayerSmall];
};
