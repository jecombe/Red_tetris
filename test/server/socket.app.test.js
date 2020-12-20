import 'regenerator-runtime/runtime';

import { initSocket, destroySocket } from './helpers/socket';
import routes from '../../src/server/socket/routes';

const ev = require('../../src/shared/events');
const logger = require('../../src/server/utils/logger');

describe('# Socket Tests - App Events', () => {
  let socket;

  beforeAll(async () => {
    socket = await initSocket();
  });

  afterAll(() => {
    destroySocket(socket);
  });

  describe('## Login Events', () => {
    it('should handle login', async () => {
      const serverResponse = new Promise((resolve, reject) => {
        socket.on(ev.res_LOGIN, (data) => {
          resolve(data);
        });

        setTimeout(() => {
          reject(new Error('Failed to get reponse, connection timed out...'));
        }, 10000);
      });

      const payload = {
        name: 'name',
        room: 'room',
      };

      socket.emit(ev.req_LOGIN, payload);

      const data = await serverResponse;

      expect(data.status).toBe(200);
    });

    it('should handle logout', async () => {
      const serverResponse = async (event) => new Promise((resolve, reject) => {
        socket.on(event, (data) => {
          resolve(data);
        });

        setTimeout(() => {
          reject(new Error('Failed to get reponse, connection timed out...'));
        }, 10000);
      });

      const payload = {
        name: 'name',
        room: 'room',
      };

      socket.emit(ev.req_LOGOUT, payload);

      const data = await serverResponse(ev.res_LOGOUT);

      expect(data.status).toBe(200);
    });

    it('should handle infos', async () => {
      const serverResponse = new Promise((resolve, reject) => {
        socket.on(ev.res_UPDATE_APP_INFOS, (data) => {
          resolve(data);
        });

        setTimeout(() => {
          reject(new Error('Failed to get reponse, connection timed out...'));
        }, 10000);
      });

      const payload = {};

      socket.emit(ev.req_UPDATE_APP_INFOS, payload);

      const data = await serverResponse;

      expect(data.status).toBe(200);
    });
  });
});
