import ev from '../../src/shared/events';
import actions from '../../src/client/actions';
import reducer, { appState } from '../../src/client/reducers/app';
import { createStage, createStagePiece } from '../../src/server/stage/utils';

describe('# Redux Tests - App', () => {
  const initialState = appState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('## Socket', () => {
    it('should reduce - CLIENT_CONNECT', () => {
      const payload = {
        host: 'host',
        port: 'port',
      };
      const expectedAction = {
        type: ev.CLIENT_CONNECT,
        payload,
      };
      const expectedState = {
        connected: true,
        games: {},
      };

      expect(actions.app.CLIENT_CONNECT(payload)).toEqual(expectedAction);
      expect(reducer(undefined, expectedAction)).toEqual(expectedState);
      expect(reducer(initialState, expectedAction)).toEqual(expectedState);
    });

    it('should reduce - CLIENT_DISCONNECT', () => {
      initialState.connected = true;

      const payload = {};
      const expectedAction = {
        type: ev.CLIENT_DISCONNECT,
        payload,
      };
      const expectedState = {
        connected: false,
        games: {},
      };

      expect(actions.app.CLIENT_DISCONNECT(payload)).toEqual(expectedAction);
      expect(reducer(undefined, expectedAction)).toEqual(expectedState);
      expect(reducer(initialState, expectedAction)).toEqual(expectedState);
    });
  });

  describe('## Login', () => {
    initialState.connected = true;

    it('should reduce - req_LOGIN', () => {
      const payload = {
        playerName: 'playerName',
        playerRoom: 'playerRoom',
      };
      const expectedAction = {
        type: ev.req_LOGIN,
        payload,
      };

      expect(actions.app.reqLogin(payload)).toEqual(expectedAction);
    });

    it('should reduce - res_ROOMS', () => {
      const payload = {
        games: [{ roomName: 'zboub' }]
      };
      const expectedAction = {
        type: ev.res_ROOMS,
        payload,
      };
      const expectedState = {
        ...initialState,
        games: [{ roomName: 'zboub' }],
      };

      expect(actions.app.resRooms(payload)).toEqual(expectedAction);
      expect(reducer(initialState, expectedAction)).toEqual(expectedState);
    });
  });
});
