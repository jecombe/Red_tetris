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

const login = (req, res) => {
  const { socket } = req;
  const { name, room } = req.data;

  try {
    RedTetris.reqLogin(req, res);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: { game: RedTetris.getGame(room) },
    });

    emitToSocket(socket, ev.res_LOGIN, {
      status: 200,
      payload: { name, room },
    });

    resInfos(res.io);
  } catch (err) {
    logger.error('[login] ', err);

    emitToSocket(socket, ev.res_LOGIN, {
      status: 500,
      payload: {},
    });
  }
};

const logout = (req, res) => {
  const { socket } = req;
  const { room } = req.data;

  try {
    RedTetris.reqLogout(req, res);

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
    logout(
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
  connect,
  disconnect,
  login,
  logout,
};
