import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import appRoutes from './routes/app';

import { loginUser, createGame, freeUserInGame, startGame } from './handler'


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(appRoutes);


var userlist = [];
var onlineGame = [];


io.on('connection', (socket) => {

  console.log(socket);
  io.sockets.emit('getRoomList', {
    'room': onlineGame
  });

  socket.on('login', info => {

    loginUser(socket, info, userlist)
    console.log(userlist)

  })

  socket.on('joinOrCreateGame', game => {

    createGame(game, onlineGame, userlist, socket)
    io.sockets.emit('joined', {
      'success': true,
      'room': onlineGame
    });


  })

  socket.on('startGame', game => {

    startGame(game)


  })

  socket.on('disconnect', () => {


    freeUserInGame(socket.id, onlineGame, userlist)
  });
});

server.listen(8000, () => console.log('Running on localhost:8080'));
