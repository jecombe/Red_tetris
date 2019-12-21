import ev from '../../shared/events';
import logger from '../utils/logger';
import { login, logout } from '../actions/login';

const ioDispatchLogin = (redGame, socketClient) => {
  const games = redGame.getGames();

  // ROOMS
  socketClient.on(ev.req_ROOMS, (data4Server) => {
    const { message } = data4Server;
    logger.info(`client says: ${message}`);
    const data4Client = {
      status: 200, message: 'SERVER ROOMS', rooms, games,
    };
    socketClient.emit(ev.res_ROOMS, data4Client);
  });

  // LOGIN
  socketClient.on(ev.req_LOGIN, (data) => {
    const player = login(redGame, data, socketClient.id);

    redGame.io.emit(ev.res_ROOMS, {
      games,
    });
    /* Join room */
    socketClient.join(player.roomAssociate);
    console.log('PLYER => ', player)
    redGame.io.to(`${socketClient.id}`).emit(ev.OBJ_PLAYER, {
      stage: player.stage,
      nextPiece: player.nextPiece,
      otherStage: player.otherStage,
    });
  });

  // LOGOUT
  socketClient.on(ev.DISCONNECT, () => {
    redGame.unsetPlayer(socketClient.id);
     logout(redGame);
  });
};

module.exports = ioDispatchLogin;
