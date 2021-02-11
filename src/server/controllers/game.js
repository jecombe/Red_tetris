import ev from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';

const countdown = (req, res, count) => {
  const { room } = req.data;

  // logger.info('[start]', `romm ${room} start in ${count}s...`);

  if (count > 0) {
    // RedTetris.getGame(room).setMessage('server', `Game will start in ${count}`);

    setTimeout(countdown, 1000, req, res, count - 1);

    RedTetris.emitToRoom(room, ev.res_START_GAME, {
      status: 100,
      payload: {
        message: `Game will start in ${count}s...`,
      },
    });
  } else {
    RedTetris.emitToRoom(room, ev.res_START_GAME, {
      status: 200,
      payload: {
        message: 'Game started!',
      },
    });

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: {
        game: RedTetris.getGame(room),
      },
    });
  }
};

const reqStart = async (req, res) => {
  const { name, room } = req.data;

  try {
    if (!RedTetris.getGame(room) || !RedTetris.getGame(room).isOwner(name)) {
      throw new Error("Can't start game");
    }

    RedTetris.getGame(room).start(name);

    setTimeout(countdown, 1000, req, res, 3);
  } catch (err) {
    logger.error('[reqStart] ', err);
  }
};

const reqOwner = async (req) => {
  const { name, room, newOwner } = req.data;

  try {
    if (!RedTetris.getGame(room)) {
      throw new Error("Can't change owner");
    }

    RedTetris.getGame(room).setNewOwner(name, newOwner);

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
      status: 200,
      payload: {
        game: RedTetris.getGame(room),
      },
    });
  } catch (err) {
    logger.error('[reqOwner] ', err);
  }
};

const reqChat = async (req) => {
  const { room, name, text } = req.data;

  try {
    if (!RedTetris.getGame(room)) {
      throw new Error('Game not exist');
    }

    RedTetris.getGame(room).setMessage(name, text);

    RedTetris.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
      status: 200,
      payload: {
        chat: RedTetris.getGame(room).getMessages(),
      },
    });
  } catch (err) {
    logger.error('[reqChat] ', err);
  }
};

export default {
  reqStart,
  reqOwner,
  reqChat,
};
