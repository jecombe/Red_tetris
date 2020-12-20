// import http from 'http';

import params from '../shared/params';
import app from './app';
import redTetris from './socket';
import logger from './utils/logger';

const http = require('http').createServer(app);

redTetris(http);

http.listen(3000, () => {
  console.log('listening on *:3000');
});
// const port = process.env.PORT || 3000;
// const { host, port } = params.server;

// const server = app.listen({ host, port }, () => {
//   logger.info('red-tetris_server');
//   logger.info(`Listening on ${host} port ${port}.`);
// });

// redTetris(server);

// module.exports = server;
