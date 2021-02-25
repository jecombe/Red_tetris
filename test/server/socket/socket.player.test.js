import 'regenerator-runtime/runtime';

import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';
import { keys } from '../../../src/server/helpers/gameHelper';

const randomstring = require('randomstring');

const ev = require('../../../src/shared/events');
const logger = require('../../../src/server/utils/logger');

const { host, port } = params.server;

describe('# Socket Tests - Player Events', () => {
  let socket;

  beforeAll(async () => {
    server.listen({ host, port: 3003 }, () => {
      logger.info(`Listening on port ${port}!`);
    });
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    socket = await initSocket(3003);

    const payload = { name: randomstring.generate(7), room: 'room' };

    socket.emit(ev.req_LOGIN, payload);
    socket.emit(ev.req_START_GAME, payload);
    setTimeout(3);
  });

  afterEach(() => {
    destroySocket(socket);
  });

  describe('## Game Events', () => {
    it('should handle move', async () => {
      const payload = {
        name: socket.id,
        room: 'room',
        keyCode: keys.KLEFT,
      };
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      let data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KRIGHT;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KUP;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KDOWN;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KSPACE;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KSPACE;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = 99;
      socket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(socket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(500);
    });
  });
});
