import ev from '../../shared/events';
import logger from '../utils/logger';

import ioDispatchHello from './echo';
import ioDispatchLogin from './login';
import ioDispatchGame from './game';

const ioEngine = (redGame) => {

  logger.info(`Sending rooms to ${redGame.socketClient.id}.`);
  const data4Client = {
    status: 200,
    message: 'SERVER ROOMS',
    games: redGame.getGames(),
  };
  redGame.socketClient.emit(ev.res_ROOMS, data4Client);

  ioDispatchHello(redGame.socketClient);
  ioDispatchLogin(redGame, redGame.socketClient);
  ioDispatchGame(redGame, redGame.socketClient);
};

module.exports = ioEngine;
