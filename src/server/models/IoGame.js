
export default class IoGame {
  constructor() {
    this.io = null;
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
    if (!(`${game.roomName}` in this.games)) {
      this.games[game.roomName] = game;
    }
  }

  setPlayer(player) {
    if (!(`${player.idSocket}` in this.players)) {
      this.players[player.idSocket] = player;
    }
  }

  unsetGame(gameName) {
    delete this.games[gameName];
  }

  unsetPlayer(idSocket) {
    delete this.players[idSocket];
  }
}
