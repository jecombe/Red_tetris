/* eslint-disable no-unused-vars */
import ev from '../../shared/events';
import logger from '../utils/logger';
import gameHelper, { calcScore, calcLevel } from '../helpers/gameHelper';
import { createStage, createStagePiece, flushUpdate, updateRows } from '../../shared/stage';
import RedTetris from '../models';

const reqMove = (req, res) => {
    const { room, name, keyCode } = req.data;

    try {
        const key = gameHelper[keyCode];

        const { stage, piece, position, collided, loose } = key.handler(
            RedTetris.getGame(room).getPlayer(name),
            key.dir
        );

        if (collided) {
            const updated = updateRows(stage);

            RedTetris.getGame(room).updateCollision(name, updated.stage, updated.lines, loose);

            RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
                status: 200,
                payload: {
                    game: RedTetris.getGame(room)
                }
            });
        } else {
            RedTetris.getGame(room).getPlayer(name).updatePosition(stage, piece, position);

            RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_PLAYER, {
                status: 200,
                payload: {
                    player: RedTetris.getGame(room).getPlayer(name)
                }
            });
        }

        logger.info('[move]', 'success');
    } catch (err) {
        logger.error('[move] ', err);
    }
};

export default {
    reqMove
};
