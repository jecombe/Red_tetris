import { createStage } from '../stage/utils';

import { emitterStageOther } from '../emitter/emitter';
import ev from '../../shared/events';


const setStageToOther = (objGame, io) => {
  const tabUser = objGame.getUserInGame();

  tabUser.forEach((element) => {
    element.setNullOtherStage();
    let i = 0;
    for (i = 0; i !== tabUser.length - 1; i++) {
      element.setOtherStage(createStage());
    }
    emitterStageOther(io, element);
  });
  return tabUser.length;
};


// eslint-disable-next-line import/prefer-default-export
export const startGame = (redGame, data, id) => {
  const { playerRoom } = data;

  //const game = redGame.getGame(playerRoom);
  //const player = redGame.getPlayer(id);
  const payload = redGame.startGame(id, playerRoom);


  return payload;
};

export const positionTetro = (data, redGame, socketClient) => {

  const { keyCode, playerRoom } = data;

    const game = redGame.getGame(playerRoom);
    const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
    console.log("=========> ", player)
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
