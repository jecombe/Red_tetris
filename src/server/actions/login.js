import Player from '../models/Player';
import Game from '../models/Game';
import { createStage } from '../helpers/stage';

export const login = (redGame, data, id) => {
  const { username, roomActual } = data;
  const player = new Player(id, username, roomActual);
  let game;

  game = redGame.getGame(roomActual);
  if (!game) {
    game = new Game(username, roomActual);
    player.setOwner();
    redGame.setGame(game);
  }
  game.setPlayer(player);
  redGame.setPlayer(player);

  return player;
};

export const logout = (redGame, ioGame, id) => {
  const { rooms, userlist, games, players, socketClient } = ioGame;

  const player = redGame.getPlayer(id);
  const game = redGame.getGame(player.roomAssociate);
  game.unsetPlayer(id);
  // const index = game.users.findIndex((user) => user.idSocket === player.idSocket);
  // game.users.splice(index, 1);
  if (game.users.length !== 0) {
    game.setPlayerOwner(game.users[0]);
    game.users[0].setOwner();
  } else {
    redGame.unsetGame(player.roomAssociate); // delete games[player.roomAssociate];
  }
  delete players[player.idSocket];
  socketClient.leave(player.roomAssociate);

  // const b = items.find((item) => item.name === 'b')

  /* Search user login in userList */
  // const player = searchUserInList(socketClient.id, userlist);
  /* Search room name of player */
  // const roomActual = searchRoomInUser(userlist, player);
  // shareAction(player, roomActual, rooms, userlist);
};
