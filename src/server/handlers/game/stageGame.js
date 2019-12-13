import { createStage, createStagePiece } from '../../stage';
import { objUser, objPlayer } from '../../actions/utils';

const userInGameExceptActua = (userTab, userActual) => {
  var index = userTab.indexOf(userActual);
  var copie = new Array();
  for (var i = 0; i < userTab.length; i++) {
    copie[i] = userTab[i];
  }
  copie.splice(index, 1);
  return copie

}



const objPlaye = (userList, username, i, objPlayer, io, stage) => {

  console.log('--------------------------________> ', objPlayer.otherStage)


  userList.find((obj) => {
    let len = objPlayer.otherStage.length;

    if (obj.login == username) {
      obj.setNullOtherStage()


      if (len !== 0) {
        while (len != 0) {
          obj.setOtherStage(createStage())
          len--;
        }
      }
      io.to(`${obj.getIdSocket()}`).emit('otherStage', {
        otherStage: obj.otherStage
      });
    }
  });
};

const dispatchStage = (userList, objGame, objPlayer, io, stage) => {
  const tabUser = objGame.getUserInGame()

  for (var i = 0; i < tabUser.length; i++) {
    objPlaye(userList, tabUser[i], i, objPlayer, io, stage)
  }
}




const searchAllUser = (game, userlist, piece, objPlayer, io) => {
  const stage = createStage();
  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

  dispatchStage(userlist, game, objPlayer, io, newStage)
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
    obj.setPositionNull1();
    obj.setPosition1(10 / 2 - 2, 0);
    obj.setNextPiece(terrain(piece, stage));

    //obj.setStage(newStage);
  }
};

export const updateStage = (piece, gameActual, userlist, objPlayer, io) => {

  const newStage = searchAllUser(gameActual, userlist, piece, objPlayer, io);

  console.log('===============================++++++++++++++++++++++++++++> ', objPlayer.otherStage.length)
  return newStage;
};

export const printTetroStage = (gameActual, userlist) => {


  printTetro(gameActual, userlist, gameActual.getNextPieceStart())
  // const newStagPiece = getPieceInStage(gameActual)
}
