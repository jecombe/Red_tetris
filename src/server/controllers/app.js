import ev from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';

const resInfos = () => {
  RedTetris.emitToAll(ev.res_UPDATE_APP_INFOS, {
    status: 200,
    payload: {
      nbPlayers: RedTetris.getNbSockets(),
      nbGames: RedTetris.getNbGames(),
      games: RedTetris.getGames(),
    },
  });
};

const login = (req) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    if (!RedTetris.getGame(room)) {
      RedTetris.setGame(room, name);
    }

    RedTetris.getGame(room).login(socket.id, name);

    RedTetris.getSocket(socket.id).join(room);
    RedTetris.setSocketRoom(socket.id, room);

    /* Responses */

    RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
      status: 200,
      payload: { name, room },
    });

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: { game: RedTetris.getGame(room) },
    });

    resInfos();
  } catch (err) {
    RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
      status: 500,
      payload: {},
    });

    logger.error('[login] ', err);
  }
};

const logout = (req) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    if (
      !RedTetris.getGame(room) ||
      !RedTetris.getGame(room).getPlayer(socket.id)
    ) {
      throw new Error("Can't logout");
    }

    RedTetris.getGame(room).logout(socket.id, name);

    if (RedTetris.getGame(room).isEmpty()) {
      RedTetris.unsetGame(room);
    }

    RedTetris.getSocket(socket.id).leave(room);
    RedTetris.unsetSocketRoom(socket.id);

    /* Responses */

    if (socket) {
      RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
        status: 200,
        payload: {},
      });
    }

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: { game: RedTetris.getGame(room) },
    });

    resInfos();
  } catch (err) {
    if (socket) {
      RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
        status: 500,
        payload: {},
      });
    }
  }
};

const connect = (req) => {
  logger.info(`socket: ${req.socket.id} connected`);

  RedTetris.setSocket(req.socket);

  resInfos();
};

const disconnect = (req) => {
  logger.info(`socket: ${req.socket.id} disconnected.`);

  if (RedTetris.getSocketRoom(req.socket.id)) {
    logout({
      socket: req.socket,
      data: {
        name: req.socket.id,
        room: RedTetris.getSocketRoom(req.socket.id),
      },
    });
  }
  RedTetris.unsetSocket(req.socket.id);

  resInfos();
};

const error = (req) => {
  logger.info(`socket: ${req.socket.id} error.`);
};

export default {
  connect,
  disconnect,
  error,
  login,
  logout,
};
