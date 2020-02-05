
import { emitterStageOther } from '../emitter/emitter';
import logger from '../utils/logger';
import ev from '../../shared/events';

export const login = (socket, data, redGame) => {
  const { id } = socket;
  const { username, roomActual } = data;

  logger.info(`Client ${socket.id} request ${ev.req_LOGIN}`);

  redGame.loginPlayer(id, username, roomActual);

  if (!redGame.getPlayer(id)) {
    logger.error('ioDispatchLogin: Error to login.');

    socket.emit(ev.res_LOGIN, { status: 400 });
    return;
  }
  socket.emit(ev.res_LOGIN, { status: 200 });

  logger.info(`Player join socket room ${redGame.getPlayer(id).room}.`);
  socket.join(redGame.getPlayer(id).room);

  logger.info(`Sending event ${ev.res_ROOMS} to all.`);
  redGame.socketServer.emit(ev.res_ROOMS, {
    games: redGame.getGames(),
  });

  logger.info(`Sending event ${ev.OBJ_PLAYER} to client.`);
  redGame.socketServer.to(`${socket.id}`).emit(ev.OBJ_PLAYER, {
    playerStage: redGame.getPlayer(id).getStage(),
    playerNextPiece: redGame.getPlayer(id).getNextPiece(),
    playerOtherStage: redGame.getPlayer(id).getPlayerOtherStage(),
    playerOwner: redGame.getPlayer(id).isOwner(),
  });

  logger.info(`Sending event ${ev.res_BELLO} to all clients in room ${redGame.getPlayer(id).room}.`);
  redGame.socketServer.to(`${redGame.getPlayer(id).room}`).emit(ev.res_BELLO, {
    message: 'Only players in room can see that.',
  });
};

export const rooms = (socket, data, redGame) => {
  const { message } = data;
  logger.info(`client says: ${message}`);
  const data4Client = {
    status: 200, message: 'SERVER ROOMS', games: redGame.getGames(),
  };
  socket.emit(ev.res_ROOMS, data4Client);
};


const userInGameExceptActua = (userTab, userActual) => {
  const index = userTab.indexOf(userActual);
  const copie = new Array();
  for (let i = 0; i < userTab.length; i++) {
    copie[i] = userTab[i];
  }
  copie.splice(index, 1);
  return copie;
};

const getAllStagePlayers = (objGame, redGame, objPlayer) => {
  const tabUser = userInGameExceptActua(objGame.getUserInGame(), objPlayer.getLogin());

  // console.log('------------------_> ', objPlayer)

  for (let i = 0; i < tabUser.length; i++) {
    objPlayer.setOtherStage(tabUser[i].stage);
    objPlayer.setPeopleSpectre(tabUser[i].getLogin());
    tabUser[i].setOtherStage(objPlayer.stage);
    tabUser[i].setPeopleSpectre(objPlayer.getLogin());
    emitterStageOther(redGame.io, tabUser[i]);
  }
};


const replaceOtherStage = (objPlayer, objOther) => {
  const index = objOther.peopleSpectre.indexOf(objPlayer.login);
  objOther.peopleSpectre.splice(index, 1);
  objOther.otherStage.splice(index, 1);
};


const dispatchStageLogin = (objPlayer, redGame, game) => {
  const tabUser = game.getUserInGame();

  for (let i = 0; i < tabUser.length; i++) {
    if (tabUser[i].login !== objPlayer.login) {
      replaceOtherStage(objPlayer, tabUser[i]);
      emitterStageOther(redGame.io, tabUser[i]);
    }
  }
};

export const logout = (socket, redGame) => {
  const player = redGame.getPlayer(socket.id);
  if (player.username === '')
    return;
  const game = redGame.getGame(player.room);
  game.unsetPlayer(player.getIdSocket());
  if (game.users.length !== 0) {
    game.setPlayerOwner(game.users[0]);
    game.users[0].setOwner();
  } else {
    redGame.unsetGame(player.room);
  }
  dispatchStageLogin(player, redGame, game);
  redGame.unsetPlayer(player.idSocket);

};
