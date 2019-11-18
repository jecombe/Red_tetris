import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import appRoutes from './routes/app';
import socketHandler from './socket';

const port = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var userlist = [];
let rooms = [];

app.use(appRoutes);
socketHandler(io, userlist, rooms);

server.listen(port, () => console.log(`Running on localhost:${port}`));
