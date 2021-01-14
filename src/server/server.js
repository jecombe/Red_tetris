// import http from 'http';

import params from '../shared/params';
import app from './app';
import redTetris from './socket';
import logger from './utils/logger';

const http = require('http');

export default function server(params) {
    const appServer = http.createServer(app);

    redTetris(appServer);

    appServer.listen(3000, () => {
        console.log('listening on *:3000');
    });
}
