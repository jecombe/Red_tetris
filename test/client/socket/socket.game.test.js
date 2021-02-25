import 'regenerator-runtime/runtime';

import td from 'testdouble';

import ev from '../../../src/shared/events';
import actions from '../../../src/client/actions';
import store from '../../../src/client/store';
import { gameState } from '../../../src/client/reducers/game';

import { mockMiddleware, id, mockSocket } from '../helpers/socketHelper';

describe('# Socket Tests - Game Events', () => {
  describe('## Client Events', () => {
    it('should execute req_UPDATE_GAME_OWNER', () => {
      const payload = {
        newOwner: 'newOwner',
      };
      const payloadExpected = {
        name: '',
        room: '',
        newOwner: 'newOwner',
      };

      mockMiddleware(store)(() => true)(actions.reqOwner(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.req_UPDATE_GAME_OWNER, payloadExpected);
    });

    it('should execute req_UPDATE_GAME_CHAT', () => {
      const payload = {
        message: 'text',
      };
      const payloadExpected = {
        name: '',
        room: '',
        text: 'text',
      };

      mockMiddleware(store)(() => true)(actions.reqChat(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.req_UPDATE_GAME_CHAT, payloadExpected);
    });

    it('should execute req_START_GAME', () => {
      const payloadExpected = {
        name: '',
        room: '',
      };

      mockMiddleware(store)(() => true)(actions.reqStartGame({}));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.req_START_GAME, payloadExpected);
    });
  });

  describe('## Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    it('should execute res_UPDATE_GAME', () => {
      const data = {
        status: 200,
        payload: {
          game: gameState,
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_UPDATE_GAME,
          data,
        },
      });

      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should execute res_UPDATE_GAME_CHAT', () => {
      const data = {
        status: 200,
        payload: {
          chat: [{ id: true }],
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_UPDATE_GAME_CHAT,
          data,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: ev.UPDATE_GAME_CHAT,
        payload: {
          chat: data.payload.chat,
        },
      });
    });
  });
});
