import { createStage, createStagePiece } from '../../stage';
import { objUser } from '../../actions/utils';

/* --- clean tableau contenant les spectres des autres joueurs a tous les joueurs de la --- */
const setStageToOther = (userList, username, i, objPlayer, io, objGame) => {

  const tabUser = objGame.getUserInGame()

  let len = tabUser.length - 1

  userList.find((objOther) => {

    if (objOther.login == username) {
      objOther.setNullOtherStage()
      if (len !== 0) {
        while (len != 0) {
          objOther.setOtherStage(createStage())
          len--;
        }
      }
      io.to(`${objOther.getIdSocket()}`).emit('otherStage', {
        otherStage: objOther.otherStage
      });
    }
  });
};

const dispatchStage = (userList, objGame, objPlayer, io) => {
  const tabUser = objGame.getUserInGame()

  for (var i = 0; i < tabUser.length; i++) {
    setStageToOther(userList, tabUser[i], i, objPlayer, io, objGame)
  }
}




const searchAllUser = (game, userlist, piece, objPlayer, io) => {
  const stage = createStage();
  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

  dispatchStage(userlist, game, objPlayer, io)
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



const terrain = (piece, stage) => {
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
  return newStage

}


const printTetro = (game, userlist, piece) => {
  const stage = createStagePiece();


  for (let i = 0; i < game.users.length; i++) {
    const obj = objUser(userlist, game.users[i]);
    obj.setPositionNull();
    obj.setPosition1(10 / 2 - 2, 0);
    obj.setNextPiece(terrain(piece, stage));

    //obj.setStage(newStage);
  }
};

export const updateStage = (piece, gameActual, userlist, objPlayer, io) => {

  const newStage = searchAllUser(gameActual, userlist, piece, objPlayer, io);

  return newStage;
};

export const printTetroStage = (gameActual, userlist) => {

  printTetro(gameActual, userlist, gameActual.getNextPieceStart())
}
