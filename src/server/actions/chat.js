import ev from '../../shared/events';
import logger from '../utils/logger';

  // ECHO
export const message = (socket, data, redGame) => {
  const { message } = data;
  logger.info(`client says: ${message}`);
  socket.emit(ev.res_ECHO, { status: 200, message: 'SERVER ECHO' });
}
