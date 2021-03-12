import ev from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';

import { emitToAll, emitToSocket, emitToRoom } from '../helpers/emitHelper';

const resInfos = (io) => {
  emitToAll(io, ev.res_UPDATE_APP_INFOS, {
    status: 200,
    payload: {
      nbPlayers: RedTetris.getNbSockets(),
      nbGames: RedTetris.getNbGames(),
      games: RedTetris.getGames(),
    },
  });
};

const resLogin = (req, res) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    if (!name || !room || name === '' || room === '') {
      throw new Error('Invalid name or room');
    }

    let Game = RedTetris.getGame(room);
    if (!Game) {
      Game = RedTetris.createGame(room, name);
    }

    Game.setLogin(socket.id, name);

    RedTetris.getSocket(socket.id).join(room);
    RedTetris.setSocketRoom(socket.id, room);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: { game: RedTetris.getGame(room) },
    });

    emitToSocket(socket, ev.res_LOGIN, {
      status: 200,
      payload: { name, room },
    });

    resInfos(res.io);
    logger.info('login:', 'success');
  } catch (err) {
    logger.error('[login] ', err);

    emitToSocket(socket, ev.res_LOGIN, {
      status: 500,
      message: err.message,
      payload: {},
    });
  }
};

const reslogout = (req, res) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    if (!name || !room || name === '' || room === '') {
      throw new Error('Invalid name or room');
    }

    const Game = RedTetris.getGame(room);
    if (!Game) {
      throw new Error('Game not exists');
    }

    Game.setLogout(socket.id, name);

    if (Game.isEmpty()) {
      RedTetris.unsetGame(room);
    }

    RedTetris.getSocket(socket.id).leave(room);
    RedTetris.unsetSocketRoom(socket.id);

    if (socket) {
      emitToSocket(socket, ev.res_LOGOUT, {
        status: 200,
        payload: {},
      });
    }

    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: { game: RedTetris.getGame(room) },
    });

    resInfos(res.io);
  } catch (err) {
    logger.error('[logout] ', err);

    if (socket) {
      emitToSocket(socket, ev.res_LOGOUT, {
        status: 500,
        payload: {},
      });
    }
  }
};

const connect = (req, res) => {
  logger.info(`socket: ${req.socket.id} connected`);

  RedTetris.setSocket(req.socket);

  resInfos(res.io);
};

const disconnect = (req, res) => {
  logger.info(`socket: ${req.socket.id} disconnected.`);

  if (RedTetris.getSocketRoom(req.socket.id)) {
    reslogout(
      {
        socket: req.socket,
        data: {
          name: req.socket.id,
          room: RedTetris.getSocketRoom(req.socket.id),
        },
      },
      res,
    );
  }
  RedTetris.unsetSocket(req.socket.id);

  resInfos(res.io);
};

export default {
  resInfos,
  connect,
  disconnect,
  resLogin,
  reslogout,
};
