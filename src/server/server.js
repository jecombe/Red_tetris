import app from './app';
import io from './socket';
import logger from './utils/logger';

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  logger.info('red-tetris_server');
  logger.info(`Listening on port ${port}.`);
  io(server);
});

// Need to be move in app.listen callback ?

// module.expor
