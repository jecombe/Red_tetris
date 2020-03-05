import Player from '../models/Player';
import Game from '../models/Game';
import { emitterStageOther } from '../emitter/emitter';

export const login = (redGame, data, socketClient) => {
  const { username, roomActual } = data;
  const player = new Player(socketClient.id, username, roomActual);
  let game = redGame.getGame(roomActual);
  if (!game) {
    game = new Game(username, roomActual);
    player.setOwner();
    redGame.setGame(game);
  }
  game.setPlayer(player);
  redGame.setPlayer(player);
  game.setAllStage(player.getLogin(), player.getStage())
  const tabUser = game.getAllStage();
  emitterStageOther(redGame, tabUser, game);
  return ({ player: player, game: game });
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