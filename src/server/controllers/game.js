import ev from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';
import Game from '../models/Game';
import Player from '../models/Player';

const countdown = (req, res, count) => {
    const { room } = req.data;

    // logger.info('[start]', `romm ${room} start in ${count}s...`);

    if (count > 0) {
        RedTetris.getGame(room).setMessage('server', `Game will start in ${count}`);

        setTimeout(countdown, 1000, req, res, count - 1);

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
            status: 200,
            payload: {
                chat: RedTetris.getGame(room).getMessages()
            }
        });
    } else {
        RedTetris.getGame(room).setMessage('server', 'Game started !!');

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
            status: 200,
            payload: {
                game: RedTetris.getGame(room)
            }
        });
    }
};

const reqStart = async (req, res) => {
    const { name, room } = req.data;

    try {
        RedTetris.start(room, name);

        setTimeout(countdown, 1000, req, res, 3);

        logger.info('[start]', 'success');
    } catch (err) {
        logger.error('[start] ', err);
    }
};

const reqOwner = async (req, res) => {
    const { socket } = req;
    const { name, room, newOwner } = req.data;

    try {
        if (!RedTetris.getGame(room).isOwner(name)) throw new Error('Not owner of room');

        if (newOwner === '') RedTetris.getGame(room).setRandomOwner();
        else RedTetris.getGame(room).setOwner(newOwner);

        RedTetris.getGame(room).setMessage(
            'server',
            `${RedTetris.getGame(room).getSettingsOwner()} is the new owner`
        );

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
            status: 200,
            payload: {
                game: RedTetris.getGame(room)
            }
        });

        logger.info('[game] Owner of room ', room, 'is now ', newOwner);
    } catch (err) {
        logger.error('[game] ', err);
    }
};

const reqChat = async (req, res) => {
    const { socket } = req;
    const { room, name, text } = req.data;

    try {
        // if (!RedTetris.isLogged(socket)) throw new Error('player not logged');

        RedTetris.getGame(room).setMessage(name, text);

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
            status: 200,
            payload: {
                chat: RedTetris.getGame(room).getMessages()
            }
        });

        logger.info('[chat]', 'success');
    } catch (err) {
        logger.error('[chat] ', err);
    }
};

export default {
    reqStart,
    reqOwner,
    reqChat
};
