import 'regenerator-runtime/runtime';

import server from '../../src/server/server';

import { initSocket, destroySocket } from './helpers/socket';
import routes from '../../src/server/socket/routes';

const ev = require('../../src/shared/events');
const logger = require('../../src/server/utils/logger');

server(3000);

describe('# Socket Tests - Game Events', () => {
    let socket;

    beforeAll(async () => {
        socket = await initSocket();

        const payload = { name: 'name', room: 'room' };

        socket.emit(ev.req_LOGIN, payload);
    });

    afterAll(() => {
        destroySocket(socket);
    });

    describe('## Game Events', () => {
        it('should handle start', async () => {
            const serverResponse = new Promise((resolve, reject) => {
                socket.on(ev.res_UPDATE_GAME, (data) => {
                    resolve(data);
                });

                setTimeout(() => {
                    reject(new Error('Failed to get reponse, connection timed out...'));
                }, 10000);
            });

            const payload = {
                name: 'name',
                room: 'room'
            };

            socket.emit(ev.req_START_GAME, payload);

            const data = await serverResponse;

            expect(data.status).toBe(200);
        });

        it('should handle owner', async () => {
            const serverResponse = new Promise((resolve, reject) => {
                socket.on(ev.res_UPDATE_GAME, (data) => {
                    resolve(data);
                });

                setTimeout(() => {
                    reject(new Error('Failed to get reponse, connection timed out...'));
                }, 10000);
            });

            const payload = {
                name: 'name',
                room: 'room',
                newOwner: ''
            };

            socket.emit(ev.req_UPDATE_GAME_OWNER, payload);

            const data = await serverResponse;

            expect(data.status).toBe(200);
        });

        it('should handle chat', async () => {
            const serverResponse = new Promise((resolve, reject) => {
                socket.on(ev.res_UPDATE_GAME_CHAT, (data) => {
                    resolve(data);
                });

                setTimeout(() => {
                    reject(new Error('Failed to get reponse, connection timed out...'));
                }, 10000);
            });

            const payload = {
                name: 'name',
                room: 'room',
                newOwner: ''
            };

            socket.emit(ev.req_UPDATE_GAME_CHAT, payload);

            const data = await serverResponse;

            expect(data.status).toBe(200);
        });
    });
});
