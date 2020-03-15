import Player from '../models/Player';
import Game from '../models/Game';
import logger from '../utils/logger';
import ev from '../../shared/events';

import { emitterStageOther, emitterLogin } from './emitter';

export const resLogin = (socket, data, redGame) => {
  const { username, roomActual } = data;
  const player = new Player(socket.id, username, roomActual);
  let game = redGame.getGame(roomActual);
  if (!game) {
    game = new Game(username, roomActual);
    player.setOwner();
    redGame.setGame(game);
  }
  game.setPlayer(player);
  redGame.setPlayer(player);
  const tabUser = game.getAllStage();
  emitterStageOther(redGame, tabUser, game);

  redGame.io.emit(ev.res_ROOMS, {
    games: redGame.getGames(),
  });
  /* Join room */
  socket.join(player.roomAssociate);
  emitterLogin(redGame, player, game, socket);
  // return ({ player, game });
};

export const resRooms = (socket, data, redGame) => {
  const { message } = data;
  logger.info(`client says: ${message}`);
  const data4Client = {
    status: 200,
    message: 'SERVER ROOMS',
    games: redGame.getGames(),
  };
  socket.emit(ev.res_ROOMS, data4Client);
};

export const logout = (redGame, id) => {
  const player = redGame.getPlayer(id);
  if (!player) return;

  const game = redGame.getGame(player.roomAssociate);

  game.unsetPlayer(player.getIdSocket());
  if (game.users.length !== 0) {
    game.setPlayerOwner(game.users[0]);
    game.users[0].setOwner();
  } else {
    redGame.unsetGame(player.roomAssociate);
  }
  redGame.unsetPlayer(player.idSocket);
};
