import ev from '../../shared/events';
// import { positionTetro } from '../actions/eventActions';
import { startGame, positionTetro } from '../actions/game';
import { updateStagingAfterCollision, flushUpdate } from '../stage/stage';
import { createStagePiece } from '../stage/utils';

const ioDispatchGame = (redGame, socketClient) => {
  socketClient.on(ev.START_GAME, (data) => {
    const { playerRoom } = data;
    const { newStage, nextPiece, otherNotLosing, position, collided, piece } = startGame(redGame, data, socketClient.id);
    console.log("PIECE " , piece)

    redGame.io.sockets.in(playerRoom).emit(ev.STAGE, {
      newStage,
      nextPiece,
      gameOver: false,
      otherNotLosing,
      position,
      collided,
      piece,
    });
  });

  socketClient.on(ev.POSITION_TETRO, (data) => {
   // const { newStage, nextPiece, gameOver, otherNotLosing, playerLineFull } = positionTetro(redGame, data, socketClient.id);

   positionTetro(data, redGame, socketClient);
  });

  socketClient.on(ev.req_UPDATE_COLLISION, (data) => 
  {
    console.log("*********************************************************************")
    const { playerStage, playerRoom } = data;
    const game = redGame.getGame(playerRoom);
    const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
    player.setStage(playerStage);
    player.setIndex(player.index + 1);
    player.setPiece(game.tetro[player.index]);
    if (!game.tetro[player.index + 1]) game.setTetro();
    player.setStage(updateStagingAfterCollision(player.piece, player));
    player.setNextPiece(flushUpdate(game.tetro[player.index + 1], player, createStagePiece()));
    console.log(player.stage)
    socketClient.emit(ev.res_UPDATE_COLLISION, {
    piece: player.getPiece(),
   })
    // redGame.socketServer.to(`${socket.id}`).emit(ev.res_UPDATE_COLLISION, {
    //   playerStage: player.stage,
    // });

  })

};

module.exports = ioDispatchGame;
