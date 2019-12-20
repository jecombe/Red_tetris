import { createStage, createStagePiece } from '../stage/utils';
import {
  moveDownTetro,
  moveTetro,
  moveUpTetro,
  dropTetro,
  
} from './move';
import ev from '../../shared/events';
import { flushUpdate } from '../stage/stage';

// eslint-disable-next-line import/prefer-default-export
export const startGame = (redGame, data, id) => {
  const { room } = data;

  const game = redGame.getGame(room);
  const player = redGame.getPlayer(id);
  game.setTetroNull();
  game.setGameStart();

  const stage = createStagePiece();
  const newStage = createStage().map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

  const piece = game.getNextPieceStart();
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

  game.users.map((user) => {
    // const player = redGame.getPlayer(user.idSocket);
    user.setPositionNull();

    user.setPlayerNull();
    user.setPiece(piece);
    user.setPosition(10 / 2 - 2, 0);
    user.setPositionNextTetro(10 / 2 - 2, 0);
    user.setNextPiece(flushUpdate(piece, user, stage));
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

  //console.log('game ', game)
 // moveTetro(-1, objUser, objGame);
   if (keyCode === 40) {
     console.log('......>>>>>>>>>>>>>>>>>>>>>>> ', redGame.userlist)
     dropTetro(player, game, redGame);
   }
     if (keyCode === 37){
      moveTetro(game, player, -1);
    }
    else if (keyCode === 38) {
      moveUpTetro(player, 1);
    }
   else if (keyCode === 39) {
     moveTetro(game, player, 1);
    }

  // Probleme avec moveDownTetro car userlist doit etre remplace par players de redGame
   else if (keyCode === 32) 
   {
     moveDownTetro(redGame, game, player);
   }

  const payload = {
    newStage: player.stage,
    nextPiece: player.nextPiece,
  };

  return payload;
};
