import logger from '../utils/logger';
import { logout } from './login';

export const socketConnect = (socket, redGame) => {
  logger.info(`Client ${socket.id} connected.`);
  redGame.setPlayer(socket.id);
};

export const socketDisconnect = (socket, redGame) => {
  logger.info(`Client ${socket.id} disconnected.`);
  logger.info('We are in ioDispatchLogin for handle disconnect !');
  // redGame.unsetPlayer(socketClient.id);
  const player = redGame.getPlayer(socket.id);

  player.logout(redGame);
};

export const socketError = (socket, redGame) => {
  logger.error(`Client ${socket.id} error.`);
};
