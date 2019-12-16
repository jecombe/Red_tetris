import Game from '../../models/Game';

const create = (roomName, username, userList) => {
  const game = new Game(roomName);
  game.setPlayerOwner(username);
  userList.find((obj) => {
    if (obj.login == username) {
      obj.owner = true;
    }
  });
  return game;
};

const findGame = (onlineGame, roomActual) => {
  let gameExiste = 'toCreate';

  if (!onlineGame.length) {
    gameExiste = 'toCreate';
  }
  onlineGame.find((obj) => {
    if (obj.roomName == roomActual) {
      gameExiste = 'toJoin';
    }
  });
  return gameExiste;
};

const addPlayerInGame = (onlineGame, username, roomActual) => {
  let objGame;
  onlineGame.find((obj) => {
    if (obj.roomName == roomActual) {
      obj.users.push(username);
      objGame = obj;
      return objGame;
    }
  });
  return objGame;
};

const addGameInPlayer = (userList, username, roomName) => {
  let objPlayer;
  userList.find((obj) => {
    if (obj.login == username) {
      obj.roomAssociate = roomName;
      objPlayer = obj;
      return objPlayer;
    }
  });
  return objPlayer;
};

const objPlaye = (userList, username, i, objPlayer) => {
  const allStage = [];
  userList.find((obj) => {
    if (obj.login == username) {
      objPlayer.setOtherStage(obj.stage);
      objPlayer.setPeopleSpectre(obj.getLogin());
    }
  });
};

const objj = (userList, username) => {
  let objOther;
  userList.find((obj) => {
    if (obj.login == username) {
      objOther = obj;
      return objOther;
    }
  });
  return objOther;
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
const getAllStagePlayers = (objGame, userList, objPlayer, io) => {
  const tabUser = userInGameExceptActua(objGame.getUserInGame(), objPlayer.getLogin());


  for (var i = 0; i < tabUser.length; i++) {
    objPlaye(userList, tabUser[i], i, objPlayer);
  }
  const lenUser = objGame.getUserInGame();
  for (var i = 0; i < tabUser.length; i++) {
    const objOther = objj(userList, tabUser[i]);
    objOther.setOtherStage(objPlayer.stage);
    objOther.setPeopleSpectre(objPlayer.getLogin());
    // console.log(objPlayer.getIdSocket())
    io.to(`${objOther.getIdSocket()}`).emit('otherStage', {
      otherStage: objOther.otherStage,
    });
  }
};


export const createGame = (onlineGame, userList, username, roomActual, io) => {
  const existeGame = findGame(onlineGame, roomActual);

  if (existeGame === 'toCreate') {
    const createGame = create(roomActual, username, userList);
    onlineGame.push(createGame);
  }
  const objGame = addPlayerInGame(onlineGame, username, roomActual);
  const objPlayer = addGameInPlayer(userList, username, roomActual);

  getAllStagePlayers(objGame, userList, objPlayer, io);

  return [objGame, objPlayer];
};
