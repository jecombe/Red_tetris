
export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_PIECE = 7;
export const STAGE_HEIGHT_PIECE = 4;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));
export const createStagePiece = () => Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear']));


export const isFull = (currentValue) => (currentValue[1] === 'merged');

export const updateStage = (piece, newStage, obj) => {
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + obj.pos.y][x + obj.pos.x] = [
          value,
          `${obj.collided ? 'merged' : 'clear'}`,
        ];
      }
    });
  });
  return newStage;
};


// export const flushUpdate = (piece, obj, stage) => {

//   const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

//   updateStage(piece, newStage, obj);
// }
