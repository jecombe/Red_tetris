import ev from '../../shared/events';
import logger from '../utils/logger';
import { logout } from './login';

export const socketConnect = (socket, redGame) => {
  logger.info(`Client ${socket.id} connected.`);

  logger.info(`Sending rooms to ${socket.id}.`);
  const data4Client = {
    status: 200,
    message: 'SERVER ROOMS',
    games: redGame.getGames(),
  };
  socket.emit(ev.res_ROOMS, data4Client);
  // redGame.setPlayer(socket.id);
  // redGame.setSockets(socketServer, socketClient);
};

export const socketDisconnect = (socket, redGame) => {
  logger.info(`Client ${socket.id} disconnected.`);
  // logger.info('We are in ioDispatchLogin for handle disconnect !');
  // // redGame.unsetPlayer(socketClient.id);
  // const player = redGame.getPlayer(socket.id);

  // player.logout(redGame);
  logout(redGame, socket.id);
};

export const socketError = (socket, redGame) => {
  logger.error(`Client ${socket.id} error.`);
};
