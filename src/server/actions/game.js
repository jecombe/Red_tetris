import { createStage } from '../stage/utils';

import { emitterStageOther } from '../emitter/emitter';
import ev from '../../shared/events';



// eslint-disable-next-line import/prefer-default-export
export const startGame = (redGame, data, id) => {
  const { playerRoom } = data;
  return redGame.startGame(id, playerRoom);
};

export const positionTetro = (data, redGame, socketClient) => {

  const { keyCode, playerRoom } = data;

  const game = redGame.getGame(playerRoom);
  const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
  
  player.positionTetro(keyCode, game, redGame)
  redGame.io.to(`${socketClient.id}`).emit(ev.STAGE, {
    newStage: player.stage,
    nextPiece: player.nextPiece,
    gameOver: player.getLosing(),
    otherNotLosing: player.notLosing,
    win: player.win,
    playerLineFull: player.getLineFull(),
  });
};
