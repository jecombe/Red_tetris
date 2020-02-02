
import Player from './Player';
import Game from './Game';
import logger from '../utils/logger';

export default class IoGame {
  constructor(socketServer) {
    this.socketServer = socketServer;
    this.sockets = {};
    this.games = {};
    this.players = {};
  }

  /* Sockets */

  setSocket(socket) {
    logger.debug(`IoGame: Trying to set socket with id: ${socket.id}...`);

    if (this.getSocket(socket)) {
      logger.error(`IoGame: Socket with id ${socket.id} already set.`);
      return false;
    }
    logger.info('IoGame: Socket not found. Creating new one...');
    this.sockets[socket.id] = socket;

    return true;
  }

  getSocket(id) {
    if (!(`${id}` in this.sockets)) {
      return false;
    }

    return this.sockets[id];
  }

  unsetSocket(socket) {
    logger.info(`IoGame: Trying to unset socket with id: ${socket.id}...`);

    if (!(this.getSocket(socket))) {
      logger.error(`IoGame: Socket with id ${socket.id} not found.`);
      return false;
    }
    logger.info('IoGame: Socket found. Deleting it...');
    delete this.sockets[socket.id];

    return true;
  }

  /* Games */

  setGame(game) {
    logger.info(`IoGame: Trying to set game with name: ${game.roomName}...`);

    if (!(`${game.roomName}` in this.games)) {
      this.games[game.roomName] = game;
    }
  }

  getGames() {
    return this.games;
  }

  getGame(room) {
    if (!(`${room}` in this.games)) {
      return false;
    }

    return this.games[room];
  }

  getPlayer(id) {
    return this.players[id];
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

  /* Actions */

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

  startGame(id, room) {
    return this.getGame(room).startGame(id);
    // const player = game.getPlayer(id);

  }
}
