import ev from '../../shared/events';
// import { positionTetro } from '../actions/eventActions';
import { startGame, positionTetro } from '../actions/game';
import { flushUpdate, updateRows } from '../stage/stage';
import { createStagePiece } from '../stage/utils';

import { emitterStageOther, emitterMallus } from '../emitter/emitter';
//import {dispatchStage} from '../actions/move'


const replaceOtherStage = (objPlayer, objOther) => {
  const index = objPlayer.peopleSpectre.indexOf(objOther.login);
  let id = 0;
  objPlayer.otherStage[index] = objOther.stage;

  objPlayer.otherStage.map((newStage) => {
    const nouv = newStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    objPlayer.otherStage[id] = nouv;
    id += 1;
  });
};


const sendSpectreToOther = (tabUser, objPlayer, io, objOther) => {
  objOther.forEach((element) => {
    if (element.login !== objPlayer.login) {
      replaceOtherStage(objPlayer, element);
    }
  });
  emitterStageOther(io, objPlayer);
};


export const dispatchStage = (objPlayer, io, objGame) => {
  const tabUser = objPlayer.getPeopleSpectre();
  sendSpectreToOther(tabUser, objPlayer, io, objGame.getUserInGame());
};




const setMallusToPlayers = (userTab, userActual, io, objGame, objPlayer, lineFull) => {
  console.log("LINE FULL ", userTab)

  if (lineFull === true)
  {
  for (let i = 0; i < userTab.length; i++) {
    if (userTab[i].login !== userActual) {
      userTab[i].setMallus();
      const calcRow = 20 - userTab[i].getMallus();
      /* --- Check Game Over with mallus --- */
      if (calcRow === 0) {
        console.log('GAME OVER MALLUS');
        userTab[i].setLosing(true);
      }
      if (calcRow < 20) {
        const newStage = userTab[i].stage.slice(1, 20);
        newStage.push(new Array(10).fill(['M', 'mallus']));
        userTab[i].setStage(newStage);
        emitterMallus(io, userTab[i]);
      }
    }
  }
}
  dispatchStage(objPlayer, io, objGame);
};


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

  socketClient.on(ev.POSITION_TETRO, (data) => {
    // const { newStage, nextPiece, gameOver, otherNotLosing, playerLineFull } = positionTetro(redGame, data, socketClient.id);

    positionTetro(data, redGame, socketClient);
  });

  socketClient.on(ev.req_UPDATE_COLLISION, (data) => {


    const { playerStage, playerRoom, lineFull } = data;
    const game = redGame.getGame(playerRoom);
    const player = redGame.getGame(playerRoom).getPlayer(socketClient.id);
    //updateRows(playerStage, game, player, redGame)
    player.setStage(playerStage);
    //dispatchStage(player, redGame.io, game);
    console.log("LINE FULL PREMIER +> ", lineFull)
    setMallusToPlayers(game.getUserInGame(), player.getLogin(), redGame.socketClient, game, player, lineFull)

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
