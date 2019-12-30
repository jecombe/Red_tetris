import 'regenerator-runtime/runtime';

import td from 'testdouble';

import ev from '../../src/shared/events';
import store from '../../src/client/store';

const appModule = require('../../src/client/middleware/socketIoMiddleware');

const socketModule = appModule.middleware;
const mockMiddleware = appModule.default;
const { id } = appModule;
const mockSocket = { emit: jest.fn() };

socketModule.SOCKETS[id] = mockSocket;
socketModule.toggleInitStatus(id);

describe('Counter Middleware', () => {
  // let id;
  // let mockSocket;
  // let mockMiddleware;
  // let socketMiddleware;

  // // eslint-disable-next-line no-shadow
  // // const stubMockSocket = (id, mockSocket) => {
  // //   socketMiddleware.SOCKETS[id] = mockSocket;
  // //   socketMiddleware.toggleInitStatus(id);
  // // };

  // // const stubMiddleware = () => {
  // //   id = appMiddleware.id;
  // //   socketMiddleware = appMiddleware.middleware;
  // //   mockMiddleware = appMiddleware.default;

  // //   stubMockSocket(id, mockSocket);
  // // };

  // // beforeEach(() => {
  // //   mockSocket = {
  // //     emit: jest.fn(),
  // //   };
  // // });

  describe('Client Events', () => {
    // beforeEach(() => {
    //   stubMiddleware();
    // });

    describe('req_LOGIN', () => {
      it('emits the event to the server', () => {
        const action = {
          type: ev.req_LOGIN,
          payload: {
            playerName: 'playerName',
            playerRoom: 'playerRoom',
          },
        };
        const actionExpected = {
          username: 'playerName',
          roomActual: 'playerRoom',
        };

        mockMiddleware(store)(() => true)(action);
        expect(mockSocket.emit).toHaveBeenCalledWith(action.type, actionExpected);
      });
    });

    describe('POSITION_TETRO', () => {
      it('emits the event to the server', () => {
        const action = {
          type: ev.POSITION_TETRO,
          payload: {
            keyCode: 'pos',
          },
        };
        const actionExpected = {
          keyCode: 'pos',
        };

        mockMiddleware(store)(() => true)(action);
        expect(mockSocket.emit).toHaveBeenCalledWith(action.type, actionExpected);
      });
    });

    describe('START_GAME', () => {
      it('emits the event to the server', () => {
        const action = {
          type: ev.START_GAME,
          payload: {
            username: 'playerName',
            room: 'playerRoom',
          },
        };
        const actionExpected = {
          username: 'playerName',
          room: 'playerRoom',
        };

        mockMiddleware(store)(() => true)(action);
        expect(mockSocket.emit).toHaveBeenCalledWith(action.type, actionExpected);
      });
    });
  });

  describe('Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    describe('res_ROOMS', () => {
      it('is handled by the middleware', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`,
          payload: {
            type: ev.res_ROOMS,
            data: { value: 1 },
          },
        });

        expect(store.dispatch).toHaveBeenCalled();
      });
    });

    describe('OBJ_PLAYER', () => {
      it('is handled by the middleware', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`,
          payload: {
            type: ev.OBJ_PLAYER,
            data: { value: 1 },
          },
        });

        expect(store.dispatch).toHaveBeenCalled();
      });
    });

    describe('STAGE', () => {
      it('is handled by the middleware', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`,
          payload: {
            type: ev.STAGE,
            data: { value: 1 },
          },
        });

        expect(store.dispatch).toHaveBeenCalled();
      });
    });

    describe('STAGE_MALLUS', () => {
      it('is handled by the middleware', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`,
          payload: {
            type: ev.STAGE_MALLUS,
            data: { value: 1 },
          },
        });

        expect(store.dispatch).toHaveBeenCalled();
      });
    });
  });
});
