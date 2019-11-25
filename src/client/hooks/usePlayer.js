import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../components/tetrominos';
import { STAGE_WIDTH, checkCollision } from '../helpers/gameHelpers';

export const usePlayer = (props) => {

  console.log("PROPS USEPLAYER ", props)
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  
  const resetPlayer = useCallback((test) => {
    console.log('DANS LE CALLBACK ',test)
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: test,
      collided: false,
    });
  }, []);

return [player, updatePlayerPos, resetPlayer, playerRotate];
};
