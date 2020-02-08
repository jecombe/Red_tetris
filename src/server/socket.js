import socketIO from 'socket.io';

import ev from '../shared/events';
import logger from './utils/logger';
import IoGame from './models/IoGame';
import { socketConnect, socketDisconnect, socketError } from './actions/socket';
import { login, logout, rooms } from './actions/login';
import { startGame, positionTetro } from './actions/game';
import { message } from './actions/chat';
import { updateStagingAfterCollision, flushUpdate } from './stage/stage';
import { createStagePiece } from './stage/utils';

const io = (server) => {
  const socketServer = socketIO(server, {
    path: '/',
    serveClient: true,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  });

  const redGame = new IoGame(socketServer);

  redGame.socketServer.on(ev.CONNECT, (socket) => {
    socketConnect(socket, redGame);

    socket.on(ev.DISCONNECT, () => socketDisconnect(socket, redGame));
    socket.on(ev.ERROR, () => socketError(socket, redGame));

    socket.on(ev.req_LOGIN, (data) => login(socket, data, redGame));
    socket.on(ev.req_ROOMS, (data) => rooms(socket, data, redGame));
    socket.on(ev.START_GAME, (data) => startGame(socket, data, redGame));
    socket.on(ev.req_UPDATE_COLLISION, (data) => 
    {
      const { playerStage, playerRoom } = data;
      console.log(playerStage)
      const game = redGame.getGame(playerRoom);
      const player = redGame.getGame(playerRoom).getPlayer(socket.id);
      player.setStage(playerStage);
      player.setIndex(player.index + 1);
      player.setPiece(game.tetro[player.index]);
      if (!game.tetro[player.index + 1]) game.setTetro();
      player.setStage(updateStagingAfterCollision(player.piece, player));
      player.setNextPiece(flushUpdate(game.tetro[player.index + 1], player, createStagePiece()));
      console.log("FIN ", player.stage)
     socket.emit(ev.res_UPDATE_COLLISION, {
      playerStage: player.stage,
     })
      // redGame.socketServer.to(`${socket.id}`).emit(ev.res_UPDATE_COLLISION, {
      //   playerStage: player.stage,
      // });

    })
    socket.on(ev.POSITION_TETRO, (data) => {

      const { keyCode, playerRoom } = data;
      const game = redGame.getGame(playerRoom);
      const player = redGame.getGame(playerRoom).getPlayer(socket.id);
      player.positionTetro(keyCode, game, redGame)
      redGame.socketServer.to(`${socket.id}`).emit(ev.STAGE, {
        newStage: player.stage,
        nextPiece: player.nextPiece,
        gameOver: player.getLosing(),
        otherNotLosing: player.notLosing,
        win: player.win,
        playerLineFull: player.getLineFull(),
        collided: player.collided,
      });
    })

    socket.on(ev.req_ECHO, (data) => message(socket, data, redGame));
    socket.on(ev.req_BELLO, (data) => message(socket, data, redGame));
  });
};

module.exports = io;
