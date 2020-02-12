
export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_PIECE = 10;
export const STAGE_HEIGHT_PIECE = 4;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));
export const createStagePiece = () => Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear']));


export const isFull = (currentValue) => (currentValue[1] === 'merged');

export const updateStage = (piece, newStage, x, y, collided) => {
  piece.form.shape.forEach((row, fy) => {
    row.forEach((value, fx) => {
      if (value !== 0) {
        newStage[fy + y][fx + x] = [
          value,
          `${collided ? 'merged' : 'clear'}`,
        ];
      }
    });
  });
  return newStage;
};
