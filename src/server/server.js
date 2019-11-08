

/*const app = require("express")();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
  });
// app.use(express.static('public'));


io.on('connection', socket => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('action', action => {

      });
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
})
app.listen(port);

*//*
const app = require("express")();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});



io.on('connection', socket => {
  console.log('a user connected');
  socket.on('action', action => {
      console.log("ACTION", action)
    switch (action.type) {
        case 'server/joinGame':
          console.log(`Socket ${socket.id} joinning ${action.gameName}`);
          break;
          case 'server/leaveGame':
            console.log(`Socket ${socket.id} leave ${action.gameName}`);
            break;
            case 'server/getPiece':
              console.log('Got getPiece !');
              socket.emit('action', {
                type: 'server/sendPiece',
                data: new Piece(),
              });
              socket.broadcast.to(action.gameName).emit('action', {
                type: 'server/gameUpdate',
                data: {
                  playerName: action.playerName,
                  board: action.board,
                },
              });
              break;
        default:
      }


  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });


  });


server.listen(port)




*/


import express from 'express';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';

import Piece from './models/Piece';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on('action', action => {
    switch (action.type) {
      case 'server/joinGame':
        console.log(`Socket ${socket.id} joinning ${action.gameName}`);
        socket.join(action.gameName);
        break;
      case 'server/leaveGame':
        console.log(`Socket ${socket.id} leaving ${action.gameName}`);
        socket.leave(action.gameName);
        break;
      case 'server/getPiece':
        console.log('Got getPiece !');
        socket.emit('action', {
          type: 'server/sendPiece',
          data: new Piece(),
        });
        socket.broadcast.to(action.gameName).emit('action', {
          type: 'server/gameUpdate',
          data: {
            playerName: action.playerName,
            board: action.board,
          },
        });
        break;
      case 'server/newPlayer':
        console.log('Got newPlayer !');
        socket.emit('action', {
          type: 'server/newPlayer',
          data: new Piece(),
        });
        break;
      default:
    }
  });
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(3011, () => console.log('Running on localhost:8080'));
