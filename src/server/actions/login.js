import Player from '../models/Player';
import Game from '../models/Game';
import { emitterStageOther } from '../emitter/emitter';


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

  getAllStagePlayers(game, redGame, player);


  return player;
};

const replaceOtherStage = (objPlayer, objOther) => {
  const index = objOther.peopleSpectre.indexOf(objPlayer.login);
  objOther.peopleSpectre.splice(index, 1);
  objOther.otherStage.splice(index, 1);
};


const dispatchStage = (objPlayer, redGame, game) => {
  const tabUser = game.getUserInGame();

  for (let i = 0; i < tabUser.length; i++) {
    if (tabUser[i].login !== objPlayer.login) {
      replaceOtherStage(objPlayer, tabUser[i]);
      emitterStageOther(redGame.io, tabUser[i]);
    }
  }
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
  dispatchStage(player, redGame, game);
  redGame.unsetPlayer(player.idSocket);

};