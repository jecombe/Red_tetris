import ev, { res_UPDATE_GAME } from '../../shared/events';
import logger from '../utils/logger';
import gameHelper, { calcScore, calcLevel } from '../helpers/gameHelper';

import RedTetris from '../models';

const move = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    console.log(keyCode);

    // RedTetris.move(room, name, keyCode);

    const key = gameHelper[keyCode];

    const {
      stage, piece, position, collided, loose,
    } = key.handler(RedTetris.getGame(room).getPlayer(name), key.dir);

    if (collided) {
      RedTetris.getGame(room).updateCollision(name, stage);

      RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_GAME, {
        status: 200,
        payload: {
          game: RedTetris.getGame(room),
        },
      });
    } else {
      RedTetris.getGame(room).getPlayer(name).updatePosition(stage, piece, position);

      RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_PLAYER, {
        status: 200,
        payload: {
          player: RedTetris.getGame(room).getPlayer(name),
        },
      });
    }

    // RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_PLAYER, {
    //   status: 200,
    //   payload: {
    //     player: RedTetris.getGame(room).getPlayer(name),
    //   },
    // });

    logger.info('[move]', 'success');
  } catch (err) {
    logger.error('[move] ', err);
  }
};

export default {
  move,
};
