import { createStage } from '../../helpers/stage';
import { objUser } from '../../actions/utils';

const searchAllUser = (game, userlist, piece) => {
  const stage = createStage();

  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${'clear'}`,
        ];
      }
    });
  });

  for (let i = 0; i < game.users.length; i++) {
    const obj = objUser(userlist, game.users[i]);
    obj.setPlayerNull();
    obj.setPiece(piece);
    obj.setPosition(10 / 2 - 2, 0);
    obj.setStage(newStage);
  }

  return newStage;
};


export const updateStage = (piece, gameActual, userlist) => {
  const newStage = searchAllUser(gameActual, userlist, piece);


  return newStage;
};
