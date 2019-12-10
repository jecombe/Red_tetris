import http from 'http';
import socketIO from 'socket.io';
import logger from './helpers/logger';

import app from './app';
import ioHandler from './socket';
import params from '../../params';

const { host, port, url } = params.server;

const server = http.createServer(app);

ioHandler(server);

server.listen({ port, host }, () => logger.info(`Running on ${url}`));
