import ev from '../utils/events';
import { startGame, positionTetro } from '../actions/eventActions';

const ioDispatchGame = (io, socketClient, ioGame) => {
  socketClient.on(ev.START_GAME, (data) => {
    startGame(io, socketClient, ioGame, data);
  });

  socketClient.on(ev.POSITION_TETRO, (data) => {
    positionTetro(io, socketClient, ioGame, data);
  });
};

module.exports = ioDispatchGame;
