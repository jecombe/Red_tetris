import ev from '../utils/events';
import logger from '../utils/logger';
import { loginUserGame, disconnect } from '../actions/eventActions';

const ioDispatchLogin = (io, socketClient, ioGame) => {
  const { rooms } = ioGame;

  // ROOMS
  socketClient.on(ev.com_ROOMS, (data4Server) => {
    const { message } = data4Server;
    logger.info(`client says: ${message}`);
    const data4Client = { status: 200, message: 'SERVER ROOMS', rooms };
    socketClient.emit(ev.res_ROOMS, data4Client);
  });

  // LOGIN
  socketClient.on(ev.LOGIN, (data) => {
    loginUserGame(io, socketClient, ioGame, data);
  });

  // LOGOUT
  socketClient.on(ev.DISCONNECT, () => {
    disconnect(socketClient, ioGame);
  });
};

module.exports = ioDispatchLogin;
