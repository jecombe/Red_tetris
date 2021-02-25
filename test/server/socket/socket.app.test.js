import 'regenerator-runtime/runtime';
import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket } from '../helpers/socket';

const ev = require('../../../src/shared/events');
const logger = require('../../../src/server/utils/logger');

const { host, port } = params.server;
// server(3000);

describe('# Socket Tests - App Events', () => {
  let socket;
  beforeEach(async () => {
    server.listen({ host, port: 3001 }, () => {
      logger.info(`Listening on port ${port}!`);
    });

    socket = await initSocket(3001);
  });

  afterEach(() => {
    destroySocket(socket);
    server.close();
  });

  describe('## Login Events', () => {
    it('should login success', async () => {
      const serverResponse = new Promise((resolve, reject) => {
        socket.on(ev.res_LOGIN, (data) => {
          resolve(data);
        });
        socket.on(ev.res_LOGOUT, (data) => {
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

    it('should login error', async () => {
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
        room: '',
      };

      socket.emit(ev.req_LOGIN, payload);

      const data = await serverResponse;

      expect(data.status).toBe(500);
    });
  });

  describe('## Logout Events', () => {
    it('should logout success', async () => {
      const serverResponse = new Promise((resolve, reject) => {
        socket.on(ev.res_LOGIN, (data) => {
          resolve(data);
        });
        socket.on(ev.res_LOGOUT, (data) => {
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
      let data = await serverResponse;
      expect(data.status).toBe(200);

      socket.emit(ev.req_LOGOUT, payload);
      data = await serverResponse;
      expect(data.status).toBe(200);
    });

    it('should logout error', async () => {
      const serverResponse = new Promise((resolve, reject) => {
        socket.on(ev.res_LOGOUT, (data) => {
          resolve(data);
        });

        setTimeout(() => {
          reject(new Error('Failed to get reponse, connection timed out...'));
        }, 10000);
      });

      const payload = {
        name: 'n',
        room: '',
      };

      socket.emit(ev.req_LOGOUT, payload);
      const data = await serverResponse;
      console.log(data);
      expect(data.status).toBe(500);
    });
  });
});
