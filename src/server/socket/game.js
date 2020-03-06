import ev from '../../shared/events';
import { startGame } from '../actions/game';
import { flushUpdate, createStagePiece } from '../../shared/stage';
import { emitterUpdateCollision, emitterStartGame } from './emitter';


const ioDispatchGame = (redGame, socketClient) => {

  //START GAME
  socketClient.on(ev.START_GAME, (data) => {

    const { playerRoom } = data;
    const { newStage, nextPiece, otherNotLosing, position, collided, piece } = startGame(redGame, data, socketClient.id);
    emitterStartGame(newStage, nextPiece, otherNotLosing, position, collided, piece, redGame, playerRoom)
    
  });

  //COLLISION
  socketClient.on(ev.req_UPDATE_COLLISION, (data) => {

    const { playerStage, playerRoom, lineFull } = data;
    const game = redGame.getGame(playerRoom);
    const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
    player.setStage(playerStage);
    player.setLineFull(lineFull);
    game.setMallusToPlayers(redGame, lineFull, player);
    player.setIndex(player.index + 1);
    player.setPiece(game.tetro[player.index]);
    if (!game.tetro[player.index + 1]) game.setTetro();
    player.setNextPiece(flushUpdate(game.tetro[player.index + 1], createStagePiece(), player.getPositionX(), player.getPositionY()));
    emitterUpdateCollision(socketClient, player)
  
  })
};

module.exports = ioDispatchGame;
