import { createStage, createStagePiece } from '../stage/utils';
import {
  moveDownTetro,
  moveTetro,
  moveUpTetro,
  dropTetro,
} from './move';
import { flushUpdate } from '../stage/stage';
import { emitterStageOther } from '../emitter/emitter';
import ev from '../../shared/events';

const setStageToOther = (objGame, io) => {
  const tabUser = objGame.getUserInGame();

  tabUser.forEach((element) => {
    element.setNullOtherStage();
    let i = 0;
    for (i = 0; i !== tabUser.length - 1; i++) {
      element.setOtherStage(createStage());
    }
    // emitterStageOther(io, element);
  });
  return tabUser.length;
};

// const startGameModifier = (socket, ioGame) => {
//   const rooms = Object.keys(socket.rooms).filter((i) => i !== socket.id);

//   if (rooms.length !== 1) return false;

//   return {rooms[0]};
// };

// eslint-disable-next-line import/prefer-default-export
export const startGame = (socket, data, redGame) => {
  const { id } = socket;
  const { playerRoom } = data;

  // const game = redGame.getGame(playerRoom);
  // const player = redGame.get.Game(playerRoom).getPlayer(id);

  // game.setTetroNull();
  // game.setGameStart();

  // const stage = createStagePiece();
  // const newStage = createStage().map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  // const newPiece =

  // let len = setStageToOther(game, redGame.io);
  // len -= 1;
  // if (len === 0) {
  //   len = 1;
  // }
  // const pieceStart = game.getPieceStart();
  // pieceStart.form.shape.forEach((row, y) => {
  //   row.forEach((value, x) => {
  //     if (value !== 0) {
  //       newStage[y + 0][x + 3] = [
  //         value,
  //         `${'clear'}`,
  //       ];
  //     }
  //   });
  // });
  // game.users.map((user) => {
  //   user.initPlayer(len, pieceStart, flushUpdate(game.getNextPieceStart(), user, stage));
  //   // user.setPositionNull();
  //   // user.setNoLosing(len);
  //   // user.setPlayerNull();
  //   // user.setPiece(pieceStart);
  //   // user.setPosition(10 / 2 - 2, 0);
  //   // user.setPositionNextTetro(10 / 2 - 2, 0);
  //   // user.setNextPiece(flushUpdate(game.getNextPieceStart(), user, stage));
  //   // user.setStage(newStage);
  //   return user;
  // });

  const payload = redGame.startGame(id, playerRoom);

  redGame.socketServer.sockets.in(playerRoom).emit(ev.STAGE, {
    newStage: payload.newStage,
    nextPiece: payload.nextPiece,
    gameOver: payload.gameOver,
    otherNotLosing: payload.notLosing,
  });
};

export const positionTetro = (socket, data, redGame) => {
  const { keyCode, playerRoom } = data;

  const game = redGame.getGame(playerRoom);
  const player = redGame.getGame(playerRoom).getPlayer(socket.id);

  /* --- Check Game Over --- */
  if (player.getLosing() === false) {
    if (keyCode === 40) {
      dropTetro(player, game, redGame);
    }
    else if (keyCode === 37) {
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
  }

  redGame.socketServer.to(`${socket.id}`).emit(ev.STAGE, {
    newStage: player.stage,
    nextPiece: player.nextPiece,
    gameOver: player.getLosing(),
    otherNotLosing: player.notLosing,
    win: player.win,
    playerLineFull: player.getLineFull(),
  });
};
