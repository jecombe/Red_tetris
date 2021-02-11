/* eslint-disable no-unused-vars */
import ev from '../../shared/events';
import logger from '../utils/logger';
import gameHelper, { calcScore, calcLevel } from '../helpers/gameHelper';
import {
  createStage,
  createStagePiece,
  flushUpdate,
  updateRows,
} from '../../shared/stage';
import RedTetris from '../models';

export const keys = {
  KDOWN: 40,
  KLEFT: 37,
  KRIGHT: 39,
  KUP: 38,
  KSPACE: 32,
  KENTER: 13,
};
export const gameAllowedKeys = [
  keys.KDOWN,
  keys.KLEFT,
  keys.KRIGHT,
  keys.KUP,
  keys.KSPACE,
];

const reqMove = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    const { collided, loose } = RedTetris.getGame(room).move(name, keyCode);

    if (collided || loose) {
      RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
        status: 200,
        payload: {
          game: RedTetris.getGame(room),
        },
      });
    } else {
      RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_PLAYER, {
        status: 200,
        payload: {
          player: RedTetris.getGame(room).getPlayer(name),
        },
      });
    }

    // logger.info('[move]', 'success');
  } catch (err) {
    logger.error('[move] ', err);
  }
};

export default {
  reqMove,
};
