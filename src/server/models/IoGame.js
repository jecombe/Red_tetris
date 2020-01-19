
import Player from './Player';
import Game from './Game';
import logger from '../utils/logger';

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

  setPlayer(id) {
    logger.info(`IoGame: Trying to set player with id: ${id}...`);
    if (!(`${id}` in this.players)) {
      logger.info('IoGame: Player not found. Creating new one...');
      this.players[id] = new Player(id);
    } else {
      logger.error(`IoGame: Player with id ${id} already set.`);
    }
  }

  unsetGame(gameName) {
    delete this.games[gameName];
  }

  unsetPlayer(idSocket) {
    delete this.players[idSocket];
  }

  // Actions

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
