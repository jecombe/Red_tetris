import ev from '../../shared/events';
// import { positionTetro } from '../actions/eventActions';
import { startGame, positionTetro } from '../actions/game';

const ioDispatchGame = (redGame, socketClient) => {
  socketClient.on(ev.START_GAME, (data) => {
    const { playerRoom } = data;
    const { newStage, nextPiece, otherNotLosing } = startGame(redGame, data, socketClient.id);

    redGame.io.sockets.in(playerRoom).emit(ev.STAGE, {
      newStage,
      nextPiece,
      gameOver: false,
      otherNotLosing,
    });
  });

  socketClient.on(ev.POSITION_TETRO, (data) => {
    const { newStage, nextPiece, gameOver, otherNotLosing } = positionTetro(redGame, data, socketClient.id);


    redGame.io.to(`${socketClient.id}`).emit(ev.STAGE, {
      newStage,
      nextPiece,
      gameOver,
      otherNotLosing,
    });
  });
};

module.exports = ioDispatchGame;
