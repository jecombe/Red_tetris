// import http from 'http';

import params from '../shared/params';
import app from './app';
import io from './socket';
import logger from './utils/logger';

// const port = process.env.PORT || 3000;
const { host, port } = params.server;

const server = app.listen({ host, port }, () => {
  logger.info('red-tetris_server');
  logger.info(`Listening on ${host} port ${port}.`);
  io(server);
});

module.exports = server;
