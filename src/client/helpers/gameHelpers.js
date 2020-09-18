import { useEffect, useRef } from 'react';
import {
  flushUpdate, updateRows, updateStage, checkCollision,
} from '../../shared/stage';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_SMALL = 8;
export const STAGE_HEIGHT_SMALL = 8;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

// export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
//   for (let y = 0; y < player.tetromino.length; y += 1) {
//     for (let x = 0; x < player.tetromino[y].length; x += 1) {
//       // 1. Check that we're on an actual Tetromino cell
//       if (player.tetromino[y][x] !== 0) {
//         if (
//         // 2. Check that our move is inside the game areas height (y)
//         // We shouldn't go through the bottom of the play area
//           !stage[y + player.pos.y + moveY]
//             // 3. Check that our move is inside the game areas width (x)
//             || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
//             // 4. Check that the cell wer'e moving to isn't set to clear
//             || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1]
//               !== 'clear'
//         ) {
//           return true;
//         }
//       }
//     }
//   }
// };

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

export const dropTetro = (piece, playerStage, position) => {
  let playerGameOver = false;
  if (!checkCollision(piece, playerStage, { x: 0, y: 1 }, position.x, position.y)) {
    const newX = position.x + 0;
    const newY = position.y + 1;
    // updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver, });
    return ({
      x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver,
    });
    // return null;
  }
  if (position.y < 1) playerGameOver = true;
  // updatePosition({
  //   x: position.x, y: position.y, playerStage: flushUpdate(piece, playerStage, position.x, position.y, false), piece, collided: true, playerGameOver
  // });
  // return null;
  return ({
    x: position.x, y: position.y, playerStage: flushUpdate(piece, playerStage, position.x, position.y, false), piece, collided: true, playerGameOver,
  });
};


export const moveTetro = (playerGameOver, piece, playerStage, position, dir) => {
  if (!checkCollision(piece, playerStage, { x: dir, y: 0 }, position.x, position.y)) {
    const newX = position.x + dir;
    const newY = position.y + 0;

    return ({
      x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver,
    });
  }
  const newX = position.x + 0;
  const newY = position.y + 0;
  return ({
    x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece, collided: false, playerGameOver,
  });
};

export const moveTetroUp = (playerGameOver, piece, playerStage, position, dir) => {
  const clonedPiece = JSON.parse(JSON.stringify(piece));
  clonedPiece.form.shape = rotate(clonedPiece.form.shape, dir);
  const pos = position.x;
  let pos2 = position.x;
  let offset = 1;
  while (checkCollision(clonedPiece, playerStage, { x: 0, y: 0 }, position.x, position.y)) {
    pos2 += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > clonedPiece.form.shape[0].length) {
      rotate(clonedPiece.form.shape, -dir);
      pos2 = pos;
      return null;
    }
  }
  return ({
    x: pos2, y: position.y, playerStage: flushUpdate(clonedPiece, playerStage, pos2, position.y, false), piece: clonedPiece, playerGameOver,
  });
};

export const moveDownTetro = (piece, playerStage, position) => {
  let i = 0;
  let checkColl = false;
  let playerGameOver = false;
  while (checkColl !== true) {
    i += 1;
    checkColl = checkCollision(piece, playerStage, { x: 0, y: i }, position.x, position.y);
    if (checkColl === true) {
      /* --- Check Game Over --- */
      if (position.y < 1) {
        console.log('GAME OVER');
        playerGameOver = true;
      }
      i -= 1;
      break;
    }
    checkColl = checkCollision(piece, playerStage, { x: 0, y: i + 1 }, position.x, position.y);
  }
  const newX = position.x + 0;
  const newY = position.y + i;
  return ({
    x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece, collided: true, playerGameOver,
  });
};

export const move = (keyCode, playerGameOver, piece, playerStage, position) => {
  let payload = null;

  if (playerGameOver === false) {
    if (keyCode === 40) {
      payload = dropTetro(piece, playerStage, position);
    } else if (keyCode === 37) {
      payload = moveTetro(playerGameOver, piece, playerStage, position, -1);
    } else if (keyCode === 39) {
      payload = moveTetro(playerGameOver, piece, playerStage, position, 1);
    } else if (keyCode === 38) {
      payload = moveTetroUp(playerGameOver, piece, playerStage, position, 1);
    } else if (keyCode === 32) {
      payload = moveDownTetro(piece, playerStage, position);
    }
  }

  return payload;
};
