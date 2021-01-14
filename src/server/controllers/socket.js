import logger from '../utils/logger';
import RedTetris from '../models';

import { infos } from './app';

const connect = (req, res) => {
    logger.info(`socket: ${req.socket.id} connected`);

    RedTetris.connect(req.socket);

    infos(req, res);
};

const disconnect = (req, res) => {
    logger.info(`socket: ${req.socket.id} disconnected.`);

    RedTetris.disconnect(req.socket);

    infos(req, res);
};

const error = (req) => {
    logger.info(`socket: ${req.socket.id} error.`);
};

export default {
    connect,
    disconnect,
    error
};
