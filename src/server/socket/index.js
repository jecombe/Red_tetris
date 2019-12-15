import ev from '../../shared/events';
import logger from '../utils/logger';

import ioDispatchHello from './echo';
import ioDispatchLogin from './login';
import ioDispatchGame from './game';

const ioEngine = (socket, ioGame) => {
  const { socketServer: io, socketClient } = socket;

  logger.info(`Sending rooms to ${socketClient.id}.`);
  const data4Client = { status: 200, message: 'SERVER ROOMS', rooms: ioGame.rooms };
  socketClient.emit(ev.res_ROOMS, data4Client);

  ioDispatchHello(socketClient);
  ioDispatchLogin(io, socketClient, ioGame);
  ioDispatchGame(io, socketClient, ioGame);
};

module.exports = ioEngine;
