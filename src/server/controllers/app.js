import ev, { res_UPDATE_APP_INFOS } from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';
import Game from '../models/Game';
import Player from '../models/Player';

const connect = (req, res) => {
  logger.info(`socket: ${req.socket.id} connected`);

  RedTetris.connect(req.socket);

  // resInfos
  RedTetris.emitToAll(res_UPDATE_APP_INFOS, {
    nbPlayers: Object.keys(RedTetris.getSockets()).length,
    nbGames: Object.keys(RedTetris.getGames()).length,
    games: RedTetris.getGames(),
  });
};

const disconnect = (req, res) => {
  logger.info(`socket: ${req.socket.id} disconnected.`);

  RedTetris.disconnect(req.socket);
  // RedTetris.unsetSocket(req.socket);

  // if (RedTetris.getSocketRoom(req.socket)) {
  //   RedTetris.logout(req.socket);
  // }

  // resInfos
};

const error = (req, res) => {
  logger.info(`socket: ${req.socket.id} error.`);
};


const login = (req, res) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    RedTetris.getSocket(socket.id).join(room);
    logger.info('socket:', socket.id, 'join room :', room);

    RedTetris.login(room, socket.id, name);

    /* Emit */

    RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
      status: 200,
      payload: {
        name,
        room,
      },
      // player: RedTetris.getGame(room).getPlayer(name),
      // game: RedTetris.getGame(room),
    });

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: {
        game: RedTetris.getGame(room),
      },
    });
    // RedTetris.emitToRoom(room, ev.res_PLAYERS, {
    //   players: RedTetris.getGame(room).getPlayers(),
    // });

    // RedTetris.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
    //   chat: RedTetris.getGame(room).getMessages(),
    // });

    logger.info('[login]', 'success');
  } catch (err) {
    RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
      status: 500,
      payload: {
        name: '',
        room: '',
      },
    });

    logger.error('[login] ', err);
  }
};

const logout = (req, res) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    logger.info('[logout]', 'try to logout', name, 'in room', room);

    RedTetris.getSocket(socket.id).leave(room);
    logger.info('socket:', 'leave room :', room);

    RedTetris.logout(room, name);

    /* Emit */

    RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
      status: 200,
      payload: {
        name: '',
        room: '',
      },
    });

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: {
        game: RedTetris.getGame(room),
      },
    });

    // RedTetris.emitToRoom(room, ev.res_PLAYERS, {
    //   players: RedTetris.getGame(room).getPlayers(),
    // });

    // RedTetris.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
    //   chat: RedTetris.getGame(room).getMessages(),
    // });

    logger.info('[logout]', 'success');
  } catch (err) {
    RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
      player: RedTetris.getGame(room).getPlayer(name).getName(),
      room: RedTetris.getGame(room).getRoom(),
    });

    logger.error('[logout] ', err);
  }
};

const infos = (req, res) => {
  RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_APP_INFOS, {
    nbPlayers: Object.keys(RedTetris.getSockets()).length,
    nbGames: Object.keys(RedTetris.getGames()).length,
    games: RedTetris.getGames(),
  });
};

export default {
  connect,
  disconnect,
  error,
  infos,
  login,
  logout,
};
