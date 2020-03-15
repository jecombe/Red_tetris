
export default class IoGame {
  constructor(socketServer) {
    this.io = socketServer;
    this.socketClient = null;
    this.games = {};
    this.players = {};
  }

  getGames() {
    return this.games;
  }

  getGame(gameName) {
    return this.games[gameName];
  }

  getPlayer(idSocket) {
    return this.players[idSocket];
  }

  setSockets(socketServer, socketClient) {
    this.io = socketServer;
    this.socketClient = socketClient;
  }

  setGame(game) {
    // if (!(`${game.roomName}` in this.games)) {
    this.games[game.roomName] = game;
    // }
  }

  setPlayer(player) {
    // if (!(`${player.idSocket}` in this.players)) {
    this.players[player.idSocket] = player;
    // }
  }

  unsetGame(gameName) {
    delete this.games[gameName];
  }

  unsetPlayer(idSocket) {
    delete this.players[idSocket];
  }


  startGame(id, room) {
    return this.getGame(room).startGame(id, this);
    // const player = game.getPlayer(id);
  }

  loginPlayer(id, playerName, roomName) {
    logger.info(`IoGame: Trying to login player ${playerName} in room ${roomName}...`);

    if (!(`${roomName}` in this.games)) {
      logger.info('IoGame: Game not found. Creating new one...');
      this.games[roomName] = new Game(playerName, roomName);
    } else if (this.games[roomName].getPlayerByPlayerName(playerName)) {
      logger.error('IoGame: Player already exists in room.');
      return false;
    }
    this.players[id].setPlayerName(playerName);
    this.players[id].setRoomName(roomName);
    this.players[id].setOwner();
    this.games[roomName].setPlayer(this.players[id]);
    return this.players[id];
  }
}
