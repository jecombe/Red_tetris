export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));


export const checkCollision = (piece, stage, { x: moveX, y: moveY }, px, py) => {

  for (let y = 0; y < piece.form.shape.length; y += 1) {

    for (let x = 0; x < piece.form.shape[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (piece.form.shape[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + py + moveY]
          // 3. Check that our move is inside the game areas width (x)
          || !stage[y + py + moveY][x + px + moveX]
          // 4. Check that the cell wer'e moving to isn't set to clear
          || stage[y + py + moveY][x + px + moveX][1]
          !== 'clear'
        ) {
          return true;
        }
      }
    }
  }

};
