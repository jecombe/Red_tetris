import ev from '../../shared/events';
import logger from '../utils/logger';
import { login, logout } from '../actions/login';

const ioDispatchLogin = (io, redGame) => {
  const games = redGame.getGames();

  // io.server.on(ev.CONNECT, (data) => {
  //   logger.info('We are in ioDispatchLogin for handle connect !', data.id);
  // });

  // // ROOMS
  // io.client.on(ev.req_ROOMS, (data4Server) => {
  //   const { message } = data4Server;
  //   logger.info(`client says: ${message}`);
  //   const data4Client = {
  //     status: 200, message: 'SERVER ROOMS', games,
  //   };
  //   io.client.emit(ev.res_ROOMS, data4Client);
  // });

  // LOGIN
  io.client.on(ev.req_LOGIN, (data) => {
    // const player = login(redGame, data, io.client.id);
    const { id } = io.client;
    const { username, roomActual } = data;

    const player = redGame.loginPlayer(io.client.id, username, roomActual);

    if (!player) {
      logger.error('ioDispatchLogin: Error after trying to login.');
      logger.error('ioDispatchLogin: Sending res_LOGIN.');
      io.client.emit(ev.res_LOGIN, {
        status: 400,
        message: 'Failed to login.',
      });
    } else {
      io.client.emit(ev.res_LOGIN, {
        status: 200,
        message: '',
      });
      logger.info(`Player join socket room ${player.room}.`);
      io.client.join(player.room);

      logger.info(`Sending event ${ev.res_ROOMS} to all.`);
      io.server.emit(ev.res_ROOMS, {
        games: redGame.getGames(),
      });

      logger.info(`Sending event ${ev.OBJ_PLAYER} to client.`);
      io.server.to(`${io.client.id}`).emit(ev.OBJ_PLAYER, {
        playerStage: redGame.getPlayer(id).getStage(),
        playerNextPiece: redGame.getPlayer(id).getNextPiece(),
        playerOtherStage: redGame.getPlayer(id).getPlayerOtherStage(),
        playerOwner: redGame.getPlayer(id).isOwner(),
      });

      logger.info(`Sending event ${ev.res_BELLO} to all clients in room ${player.room}.`);
      io.server.to(`${player.room}`).emit(ev.res_BELLO, {
        message: 'Only players in room can see that.',
      });
    }
  });

  // LOGOUT
  io.client.on(ev.DISCONNECT, (data) => {
    logger.info('We are in ioDispatchLogin for handle disconnect !');
    // redGame.unsetPlayer(socketClient.id);
    logout(redGame, io.client.id);
  });
};

module.exports = ioDispatchLogin;
