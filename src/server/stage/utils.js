
export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_PIECE = 10;
export const STAGE_HEIGHT_PIECE = 4;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));
export const createStagePiece = () => Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear']));


export const is_full = (currentValue) => (currentValue[1] === 'merged');

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

export const userInGameExceptActual = (userTab, userActual, io) => {
  for (let i = 0; i < userTab.length; i++) {
    if (userTab[i].login !== userActual) {
      userTab[i].setMallus();
      const calcRow = 20 - userTab[i].getMallus();
      if (calcRow < 20) {
        userTab[i].stage.shift();
        userTab[i].stage.push(new Array(10).fill(['M', 'mallus']));
        io.to(`${userTab[i].getIdSocket()}`).emit('stageMallus', {
          newStage: userTab[i].stage,
        });
      }
    }
  }
};
