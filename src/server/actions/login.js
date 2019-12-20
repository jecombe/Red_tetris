import Player from '../models/Player';
import Game from '../models/Game';

const userInGameExceptActua = (userTab, userActual) => {
  var index = userTab.indexOf(userActual);
  var copie = new Array();
  for (var i = 0; i < userTab.length; i++) {
    copie[i] = userTab[i];
  }
  copie.splice(index, 1);
  return copie

}

const getAllStagePlayers = (objGame, redGame, objPlayer) => {

  const tabUser = userInGameExceptActua(objGame.getUserInGame(), objPlayer.getLogin())

  for (var i = 0; i < tabUser.length; i++) {
    objPlayer.setOtherStage(tabUser[i].stage)
    objPlayer.setPeopleSpectre(tabUser[i].getLogin())
    tabUser[i].setOtherStage(objPlayer.stage)
    tabUser[i].setPeopleSpectre(objPlayer.getLogin())
    redGame.io.to(`${tabUser[i].getIdSocket()}`).emit('otherStage', {
      otherStage: tabUser[i].otherStage
    });
  }

}

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

  getAllStagePlayers(game, redGame, player)


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
