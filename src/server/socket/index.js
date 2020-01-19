import ev from '../../shared/events';
import logger from '../utils/logger';

import ioDispatchHello from './echo';
import ioDispatchLogin from './login';
import ioDispatchGame from './game';

const ioEngine = (io, redGame) => {
  logger.info(`Client ${io.client.id} connected.`);
  redGame.setPlayer(io.client.id);
  // redGame.setSockets(io.server, io.client);

  // socket DISCONNECT
  io.client.on(ev.DISCONNECT, () => {
    logger.info(`Client ${io.client.id} disconnected.`);
  });

  // socket ERROR
  io.client.on(ev.ERROR, () => {
    logger.error(`Client ${io.client.id} error.`);
  });

  // logger.info(`Sending rooms to ${io.client.id}.`);
  // const data4Client = {
  //   status: 200,
  //   message: 'SERVER ROOMS',
  //   games: redGame.getGames(),
  // };
  // io.client.emit(ev.res_ROOMS, data4Client);

  // ioDispatchHello(io.client);
  ioDispatchLogin(io, redGame);
  // ioDispatchGame(redGame, redGame.socketClient);
};

module.exports = ioEngine;
