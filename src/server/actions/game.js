import { createStage, createStagePiece } from '../stage/utils';
import {
  moveDownTetro,
  moveTetro,
  moveUpTetro,
  dropTetro,


} from './move';
import { flushUpdate } from '../stage/stage';
import { emitterStageOther } from '../emitter/emitter';


const setStageToOther = (objGame, io) => {
  const tabUser = objGame.getUserInGame();

  tabUser.forEach((element) => {
    element.setNullOtherStage();
    let i = 0;
    for (i = 0; i !== tabUser.length - 1; i++) {
      element.setOtherStage(createStage());
    }
    emitterStageOther(io, element);
  });
};


// eslint-disable-next-line import/prefer-default-export
export const startGame = (redGame, data, id) => {
  const { room } = data;

  const game = redGame.getGame(room);
  const player = redGame.getPlayer(id);

  game.setTetroNull();
  game.setGameStart();

  const stage = createStagePiece();
  const newStage = createStage().map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

  setStageToOther(game, redGame.io);
  const pieceStart = game.getPieceStart();
  pieceStart.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${'clear'}`,
        ];
      }
    });
  });
  game.users.map((user) => {
    user.setPositionNull();
    user.setPlayerNull();
    user.setPiece(pieceStart);
    user.setPosition(10 / 2 - 2, 0);
    user.setPositionNextTetro(10 / 2 - 2, 0);
    user.setNextPiece(flushUpdate(game.getNextPieceStart(), user, stage));
    user.setStage(newStage);
    return user;
  });

  const payload = {
    newStage,
    nextPiece: player.nextPiece,
  };

  return payload;
};

export const positionTetro = (redGame, data, id) => {
  const { keyCode } = data;

  const player = redGame.getPlayer(id);
  const game = redGame.getGame(player.roomAssociate);

  if (keyCode === 40) {
    dropTetro(player, game, redGame);
  }
  if (keyCode === 37) {
    moveTetro(game, player, -1);
  } else if (keyCode === 38) {
    moveUpTetro(player, 1);
  } else if (keyCode === 39) {
    moveTetro(game, player, 1);
  }
  // Probleme avec moveDownTetro car userlist doit etre remplace par players de redGame
  else if (keyCode === 32) {
    moveDownTetro(redGame, game, player);
  }

  const payload = {
    newStage: player.stage,
    nextPiece: player.nextPiece,
  };

  return payload;
};
