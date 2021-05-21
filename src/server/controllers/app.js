import logger from '../utils/logger';
import { resUpdateAppInfos, resUpdateAppLogin, resUpdateAppLogout, resUpdateGame } from '../helpers/emitHelper';

import RedTetris from '../models';

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

    Game.setPlayer(socket.id, name);

    socket.join(room);
    socket.redTetris = { name, room };
    RedTetris.setSocket(socket);
    // RedTetris.getSocket(socket.id).join(room);
    // RedTetris.setSocketRoom(socket.id, room, name);

    resUpdateGame(res.io, Game);
    resUpdateAppLogin(socket, 200, { name, room });
    resUpdateAppInfos(res.io, RedTetris);
    logger.info('login:', 'success');
  } catch (err) {
    logger.error('[login] ');

    resUpdateAppLogin(socket, 500, { name: '', room: '' });
  }
};

const reslogout = (req, res) => {
  const { socket } = req;

  try {
    if (!RedTetris.getSocket(socket.id) || !RedTetris.getSocketRoom(socket.id)) {
      throw new Error('Socket error');
    }

    const Game = RedTetris.getGame(RedTetris.getSocketRoom(socket.id));
    if (!Game) throw new Error('Game not exists');

    Game.unsetPlayer(socket.id);
    socket.leave(Game.getRoom());
    delete socket.redTetris;
    RedTetris.unsetSocket(socket.id);

    if (Game.isEmpty()) RedTetris.unsetGame(Game.getRoom());
    else resUpdateGame(res.io, Game);

    /* Socket is undefined when the user disconnect */
    if (socket) resUpdateAppLogout(socket, 200);

    resUpdateAppInfos(res.io, RedTetris);
  } catch (err) {
    logger.error('[logout] ');

    if (socket) resUpdateAppLogout(socket, 500);
  }
};

const connect = (req, res) => {
  logger.info(`socket: ${req.socket.id} connected`);

  // RedTetris.setSocket(req.socket);

  resUpdateAppInfos(res.io, RedTetris);
};

const disconnect = (req, res) => {
  logger.info(`socket: ${req.socket.id} disconnected.`);

  // const room = RedTetris.getSocketRoom(req.socket.id);
  const room = req.socket.redTetrisRoom;
  if (room) {
    reslogout(
      {
        socket: req.socket,
        data: {
          room,
        },
      },
      res,
    );
  }
  // RedTetris.unsetSocket(req.socket.id);

  // resInfos(res.io);
  resUpdateAppInfos(res.io, RedTetris);
};

export default {
  // resInfos,
  connect,
  disconnect,
  resLogin,
  reslogout,
};
