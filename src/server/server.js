import http from 'http';
import socketIO from 'socket.io';
import logger from './helpers/logger';

import app from './app';
import io from './socket';
import params from '../../params';

const { host, port, url } = params.server;

const server = http.createServer(app);

io(server);

server.listen({ port, host }, () => logger.info(`Running on ${url}`));
