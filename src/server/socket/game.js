import ev from '../../shared/events';
// import { positionTetro } from '../actions/eventActions';
import { startGame, positionTetro } from '../actions/game';

const ioDispatchGame = (redGame, socketClient) => {
  socketClient.on(ev.START_GAME, (data) => {
    const { room } = data;
    const payload = startGame(redGame, data, socketClient.id);
    const { newStage, nextPiece } = payload;

    redGame.io.sockets.in(room).emit(ev.STAGE, {
      newStage,
      nextPiece,
    });
  });

  socketClient.on(ev.POSITION_TETRO, (data) => {
    const payload = positionTetro(redGame, data, socketClient.id);
    const { newStage, nextPiece } = payload;


    redGame.io.to(`${socketClient.id}`).emit(ev.STAGE, {
      newStage,
      nextPiece,
    });
  });
};

module.exports = ioDispatchGame;
