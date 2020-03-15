export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_PIECE = 10;
export const STAGE_HEIGHT_PIECE = 4;

export const flushUpdate = (piece, stage, x, y, collided) => updateStage(piece, stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), x, y, collided);

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));
export const createStagePiece = () => Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear']));

export const isFull = (currentValue) => (currentValue[1] === 'merged');


export const updateRows = (newStage) => {
  // Pour la hauteur verifie si une ligne est pleine
  let lineFull = 0;
  newStage.forEach((row) => {
    const fullLine = row.every(isFull);
    if (fullLine === true) {
      lineFull++;
      // objPlayer.setLineFull();
      // Check l'index de la ligne pleine;
      const index = newStage.indexOf(row);
      // Met la ligne a 0
      row.fill([0, 'clear']);
      // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
      newStage.splice(index, 1);
      // Ajoute au debut du tableau un nouveau tableau de 10 a 0
      newStage.unshift(new Array(10).fill([0, 'clear']));
      // setMallusToPlayers(objGame.getUserInGame(), objPlayer.getLogin(), redGame.socketClient, objGame, objPlayer);
    }
  });
  return ({ stage: newStage, lineFull });
};

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
