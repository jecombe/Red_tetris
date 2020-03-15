import { useEffect, useRef } from 'react';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_SMALL = 8;
export const STAGE_HEIGHT_SMALL = 8;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
        // 2. Check that our move is inside the game areas height (y)
        // We shouldn't go through the bottom of the play area
          !stage[y + player.pos.y + moveY]
            // 3. Check that our move is inside the game areas width (x)
            || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
            // 4. Check that the cell wer'e moving to isn't set to clear
            || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1]
              !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
};

export const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
