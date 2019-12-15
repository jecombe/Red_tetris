import sinon from 'sinon';

import ev from '../src/shared/events';
import { exportAllDeclaration } from '@babel/types';

describe('Counter Middleware', () => {
  let id;
  let store;
  let mockSocket;
  let mockMiddleware;
  let socketMiddleware;

  // eslint-disable-next-line no-shadow
  const stubMockSocket = (id, mockSocket) => {
    socketMiddleware.SOCKETS[id] = mockSocket;
    socketMiddleware.toggleInitStatus(id);
  };

  const stubMiddleware = () => {
    store = require('../src/client/store');
    const appMiddleware = require('../src/client/middleware/socketIoMiddleware');

    socketMiddleware = appMiddleware.middleware;

    id = appMiddleware.id;
    mockMiddleware = appMiddleware.default;

    stubMockSocket(id, mockSocket);
  };

  beforeEach(() => {
    mockSocket = {
      emit: jest.fn(),
    };
  });

  describe('Client Events', () => {
    beforeEach(() => {
      stubMiddleware();
    });

    describe('req_LOGIN', () => {
      it('emits the event to the server', () => {
        const action = {
          type: ev.req_LOGIN,
          payload: {
            playerName: 'Grosse',
            playerRoom: 'Bite',
          },
        };
        mockMiddleware(store)(() => true)(action);
        // expect(mockSocket.emit).to.have.been.calledWith(action);
        expect(mockSocket.emit).toHaveBeenCalledWith(action);
      });
    });
  });
});
