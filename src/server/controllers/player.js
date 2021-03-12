/* eslint-disable no-unused-vars */
import ev from '../../shared/events';
import RedTetris from '../models';
import logger from '../utils/logger';
import { emitToAll, emitToSocket, emitToRoom } from '../helpers/emitHelper';
import { calcScore, calcLevel, keys } from '../helpers/gameHelper';

const gameAllowedKeys = [keys.KDOWN, keys.KLEFT, keys.KRIGHT, keys.KUP, keys.KSPACE];

const resCollided = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    const Player = RedTetris.getGame(room).getPlayer(req.socket.id);
    if (!Player) throw new Error('Player not exists');

    Game.updateCollision(req.socket.id);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME_PLAYERS, {
      status: 200,
      payload: { id: req.socket.id, player: Player },
    });

    Player.setFlushUpdate();

    logger.info('[resCollided]', 'success');
  } catch (err) {
    logger.error('[resCollided] ', err);
  }
};

const resFinish = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    const Player = RedTetris.getGame(room).getPlayer(req.socket.id);
    if (!Player) throw new Error('Player not exists');

    Game.updateLoose(req.socket.id);

    emitToSocket(req.socket, ev.res_START_GAME, {
      status: 100,
      payload: { message: Player.win === true ? 'You win!' : 'You loose!' },
    });

    if (Game.getStarted() === false) {
      emitToRoom(res.io, room, ev.res_START_GAME, {
        status: 100,
        payload: { message: 'The game is finished' },
      });

      emitToRoom(res.io, room, ev.res_UPDATE_GAME_SETTINGS, {
        status: 200,
        payload: { settings: Game.settings },
      });
    }

    logger.info('[resLoose]', 'success');
  } catch (err) {
    logger.error('[resLoose] ', err);
  }
};

const resMove = (req, res) => {
  const { room, name, keyCode } = req.data;

  try {
    const Game = RedTetris.getGame(room);
    if (!Game) throw new Error('Game not exists');

    const Player = RedTetris.getGame(room).getPlayer(req.socket.id);
    if (!Player) throw new Error('Player not exists');

    if (!gameAllowedKeys.includes(keyCode)) throw new Error(`Key not allowed: ${keyCode}`);

    Player.setMove(keyCode);

    if (Player.getFinish() === true) resFinish(req, res);
    else if (Player.getCollided() === true) resCollided(req, res);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 200,
      message: '',
      payload: {
        player: Player,
      },
    });

    logger.info('[resMove]', 'success');
  } catch (err) {
    logger.error('[resMove] ', err);

    // emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
    //   status: 500,
    //   message: err.message,
    //   payload: {},
    // });
  }
};

export default {
  resMove,
};
