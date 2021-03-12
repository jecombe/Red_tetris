import ev from '../../shared/events';
import logger from '../utils/logger';
import { emitToSocket, emitToRoom } from '../helpers/emitHelper';

import RedTetris from '../models';

import app from './app';

const countdown = (req, res, count) => {
  const { room } = req.data;

  if (count > 0) {
    setTimeout(countdown, 1000, req, res, count - 1);

    emitToRoom(res.io, room, ev.res_START_GAME, {
      status: 100,
      payload: {
        message: `Game will start in ${count}s...`,
      },
    });
  } else {
    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: {
        game: RedTetris.getGame(room),
      },
    });

    app.resInfos(res.io);
  }
};

const resStart = async (req, res) => {
  const { room } = req.data;

  try {
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    Game.setStart(req.data.name);

    setTimeout(countdown, 100, req, res, 3);

    logger.info('[reqStart] ', 'success');
  } catch (err) {
    logger.error('[reqStart] ', err);
    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      payload: {
        message: "Cant't start",
      },
    });
  }
};

const resOwner = async (req, res) => {
  const { id } = req.socket;
  const { name, room, newOwner } = req.data;

  try {
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    const Player = RedTetris.getGame(room).getPlayer(id);
    if (!Player) throw new Error('Player not exists');

    Game.setNewOwner(name, newOwner);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      message: '',
      payload: {
        game: RedTetris.getGame(room),
      },
    });
  } catch (err) {
    logger.error('[reqOwner] ', err);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      message: err.message,
      payload: {},
    });
  }
};

const resChat = async (req, res) => {
  const { name, room, text } = req.data;

  try {
    // RedTetris.reqChat(req, res);
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    Game.setMessage(name, text);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME_CHAT, {
      status: 200,
      payload: {
        chat: RedTetris.getGame(room).getMessages(),
      },
    });
  } catch (err) {
    logger.error('[reqChat] ', err);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      message: err.message,
      payload: {},
    });
  }
};

export default {
  resStart,
  resOwner,
  resChat,
};
