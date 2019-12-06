import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import morgan from 'morgan';
import logger from './helpers/logger';

import appRoutes from './routes/app';
import socketHandler from './socket';
import params from '../../params';

const { host, port, url } = params.server;

const app = express( );
const server = http.createServer(app);
const io = socketIO(server, {
  pingInterval: 5000,
  pingTimeout: 15000,
});


const connections = [];

const userlist = [];
const rooms = [];

app.use(appRoutes);
app.use(morgan('combined'));

io.use((socket, next) => {
  connections.push(socket.id);
  logger.info(connections);
  return next();
});

socketHandler(io, userlist, rooms);

server.listen({port, host}, () => logger.info(`Running on ${url}`));
