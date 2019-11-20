import express from 'express';
import http from 'http';
//import socketIO from 'socket.io';

import appRoutes from './routes/app';
import socketHandler from './socket';


const port = 8000;
const app = express();
const server = http.createServer(app);
//const io = socketIO(server);
const io = require('socket.io')(server, {
    pingInterval: 5000,
    pingTimeout: 15000,

});
var userlist = [];
let rooms = [];

app.use(appRoutes);
socketHandler(io, userlist, rooms);

server.listen(port, () => console.log(`Running on localhost:${port}`));
