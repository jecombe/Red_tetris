import ev from '../../shared/events';
// import { positionTetro } from '../actions/eventActions';
import { startGame, positionTetro } from '../actions/game';
import { flushUpdate, updateRows } from '../stage/stage';
import { createStagePiece } from '../stage/utils';

import { emitterStageOther, emitterMallus } from '../emitter/emitter';


const ioDispatchGame = (redGame, socketClient) => {
  socketClient.on(ev.START_GAME, (data) => {
    const { playerRoom } = data;
    const { newStage, nextPiece, otherNotLosing, position, collided, piece } = startGame(redGame, data, socketClient.id);

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


  socketClient.on(ev.req_UPDATE_COLLISION, (data) => {


    const { playerStage, playerRoom, lineFull } = data;
    const game = redGame.getGame(playerRoom);
    const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
    player.setStage(playerStage);
    game.updateStage(playerStage, player.getLogin())
    game.setMallusToPlayers(redGame, lineFull, player);
    player.setIndex(player.index + 1);
    player.setPiece(game.tetro[player.index]);
    if (!game.tetro[player.index + 1]) game.setTetro();
    player.setNextPiece(flushUpdate(game.tetro[player.index + 1], createStagePiece(), player.getPositionX(), player.getPositionY()));
    socketClient.emit(ev.res_UPDATE_COLLISION, {
      piece: player.getPiece(),
      playerNextPiece: player.getNextPiece(),
    })
  })

};

module.exports = ioDispatchGame;
