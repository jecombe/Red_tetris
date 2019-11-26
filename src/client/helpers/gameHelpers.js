export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_SMALL = 8;
export const STAGE_HEIGHT_SMALL = 8;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

export const checkCollision = (tetromino, objPlayer, { x: moveX, y: moveY }) => {

  let ret = false

  console.log('len ', tetromino.form.shape.length)
  for (let y = 0; y < tetromino.form.shape.length; y += 1) {
    for (let x = 0; x < tetromino.form.shape[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (tetromino.form.shape[y][x] !== 0) {
        if (
        // 2. Check that our move is inside the game areas height (y)
        // We shouldn't go through the bottom of the play area
          !objPlayer.stage[y + objPlayer.pos.y + moveY]
            // 3. Check that our move is inside the game areas width (x)
            || !objPlayer.stage[y + objPlayer.pos.y + moveY][x + objPlayer.pos.x + moveX]
            // 4. Check that the cell wer'e moving to isn't set to clear
            || objPlayer.stage[y + objPlayer.pos.y + moveY][x + objPlayer.pos.x + moveX][1]
              !== 'clear'
        ) {
          console.log('1')
          ret = true
          return ret;
        }
        console.log('2')

      }
    }
  }
  console.log('3')
  return ret

};
