import ev from '../../shared/events';
import logger from '../utils/logger';
import { login, logout } from '../actions/login';
import { emitterLogin } from './emitter';

const ioDispatchLogin = (redGame, socketClient) => {
  const games = redGame.getGames();

  // ROOMS
  socketClient.on(ev.req_ROOMS, (data4Server) => {
    const { message } = data4Server;
    logger.info(`client says: ${message}`);
    const data4Client = {
      status: 200, message: 'SERVER ROOMS', games,
    };
    socketClient.emit(ev.res_ROOMS, data4Client);
  });

  // LOGIN
  socketClient.on(ev.req_LOGIN, (data) => {
    const {player, game} = login(redGame, data, socketClient);

    redGame.io.emit(ev.res_ROOMS, {
      games,
    });
    /* Join room */
    socketClient.join(player.roomAssociate);
    emitterLogin(redGame, player, game, socketClient)
 
  });

  // LOGOUT
  socketClient.on(ev.DISCONNECT, (data) => {
    // redGame.unsetPlayer(socketClient.id);
    logout(redGame, socketClient.id);
  });
};

module.exports = ioDispatchLogin;
