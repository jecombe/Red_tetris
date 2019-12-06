import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import appRoutes from './routes/app';
import socketHandler from './socket';


const port = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  pingInterval: 5000,
  pingTimeout: 15000,
});

const connections = [];

const userlist = [];
const rooms = [];

app.use(appRoutes);

io.use((socket, next) => {
  connections.push(socket.id);
  console.log(connections);
  return next();
});

socketHandler(io, userlist, rooms);

server.listen(port, () => console.log(`Running on localhost:${port}`));
