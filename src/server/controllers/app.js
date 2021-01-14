import ev, { res_UPDATE_APP_INFOS } from '../../shared/events';
import logger from '../utils/logger';

import RedTetris from '../models';
import Game from '../models/Game';
import Player from '../models/Player';

const login = (req, res) => {
    const { socket } = req;
    const { name, room } = req.data;

    try {
        RedTetris.getSocket(socket.id).join(room);
        logger.info('socket:', socket.id, 'join room :', room);

        RedTetris.login(room, socket.id, name);

        /* Emit */

        RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
            status: 200,
            payload: {
                name,
                room
            }
        });

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
            status: 200,
            payload: {
                game: RedTetris.getGame(room)
            }
        });

        logger.info('[login]', 'success');
    } catch (err) {
        RedTetris.emitToSocket(socket.id, ev.res_LOGIN, {
            status: 500,
            payload: {
                name: '',
                room: ''
            }
        });

        logger.error('[login] ', err);
    }
};

const logout = (req, res) => {
    const { socket } = req;
    const { name, room } = req.data;

    try {
        logger.info('[logout]', 'try to logout', name, 'in room', room);

        RedTetris.getSocket(socket.id).leave(room);
        logger.info('socket:', 'leave room :', room);

        RedTetris.logout(room, name);

        /* Emit */

        RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
            status: 200,
            payload: {
                name: '',
                room: ''
            }
        });

        RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
            status: 200,
            payload: {
                game: RedTetris.getGame(room)
            }
        });

        logger.info('[logout]', 'success');
    } catch (err) {
        RedTetris.emitToSocket(socket.id, ev.res_LOGOUT, {
            status: 200,
            payload: {
                player: RedTetris.getGame(room).getPlayer(name).getName(),
                room: RedTetris.getGame(room).getRoom()
            }
        });

        logger.error('[logout] ', err);
    }
};

export const infos = (req, res) => {
    RedTetris.emitToSocket(req.socket.id, ev.res_UPDATE_APP_INFOS, {
        status: 200,
        payload: {
            nbPlayers: RedTetris.getNbSockets(),
            nbGames: RedTetris.getNbGames(),
            games: RedTetris.getGames()
        }
    });
};

export default {
    infos,
    login,
    logout
};
