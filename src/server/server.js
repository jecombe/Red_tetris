import app from './app';
import io from './socket';
import logger from './utils/logger';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info('red-tetris_server');
  logger.info(`Listening on port ${port}.`);
});

// Need to be move in app.listen callback ?
io(server);
