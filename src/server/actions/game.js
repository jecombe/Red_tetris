
import ev from '../../shared/events';
import { flushUpdate, createStagePiece } from '../../shared/stage';
import { emitterUpdateCollision, emitterStartGame } from './emitter';

// eslint-disable-next-line import/prefer-default-export
export const startGame = (socket, data, redGame) => {
  const { id } = socket;
  const { playerRoom } = data;
  const {
    newStage, nextPiece, otherNotLosing, position, collided, piece,
  } = redGame.startGame(id, playerRoom);
  emitterStartGame(newStage, nextPiece, otherNotLosing, position, collided, piece, redGame, playerRoom);
};

export const resUpdateCollision = (socket, data, redGame) => {
  const {
    playerStage, playerRoom, lineFull, playerGameOver,
  } = data;
  console.log('===========+++> ', playerGameOver);
  const game = redGame.getGame(playerRoom);
  const player = redGame.getGame(playerRoom).getPlayer(socket.id);
  if (playerGameOver === true) {
    console.log('Before ', game.copyUser);
    player.setGameOver();
    game.deleteUser(socket.id);
    game.checkUserWin(redGame);
    console.log('Before ', game.users);
  }
  player.setStage(playerStage);
  player.setLineFull(lineFull);
  game.setMallusToPlayers(redGame, lineFull, player);
  player.setIndex(player.index + 1);
  player.setPiece(game.tetro[player.index]);
  if (!game.tetro[player.index + 1]) game.setTetro();
  player.setNextPiece(flushUpdate(game.tetro[player.index + 1], createStagePiece(), player.getPositionX(), player.getPositionY()));
  emitterUpdateCollision(socket, player);
};

export const positionTetro = (data, redGame, socket) => {
  const { keyCode, playerRoom } = data;

  const game = redGame.getGame(playerRoom);
  const player = redGame.getGame(playerRoom).getPlayer(socket.id);

  player.positionTetro(keyCode, game, redGame);
  redGame.io.to(`${socket.id}`).emit(ev.STAGE, {
    newStage: player.getStage(),
    nextPiece: player.getNextPiece(),
    gameOver: player.getLosing(),
    otherNotLosing: player.notLosing,
    win: player.win,
    playerLineFull: player.getLineFull(),
  });
};
