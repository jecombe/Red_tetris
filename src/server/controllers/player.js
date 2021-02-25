/* eslint-disable no-unused-vars */
import ev from '../../shared/events';
import RedTetris from '../models';
import logger from '../utils/logger';
import { emitToAll, emitToSocket, emitToRoom } from '../helpers/emitHelper';

const reqMove = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    const { collided, loose } = RedTetris.reqMove(req, res);

    if (collided || loose) {
      emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
        status: 200,
        payload: {
          game: RedTetris.getGame(room),
        },
      });
    } else {
      emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
        status: 200,
        message: '',
        payload: {
          player: RedTetris.getGame(room).getPlayer(name),
        },
      });
    }

    logger.info('[move]', 'success');
  } catch (err) {
    logger.error('[move] ', err);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      message: '',
      payload: {
        player: RedTetris.getGame(room).getPlayer(name),
      },
    });
  }
};

export default {
  reqMove,
};
