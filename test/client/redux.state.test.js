import ev from '../../src/shared/events';
import * as actions from '../../src/client/actions';
import reducer from '../../src/client/reducers/app';

describe('# Redux Tests - State', () => {
  describe('## Actions Creators - App', () => {
    it('should create action - CONNECT', () => {
      const payload = {
        host: 'host',
        port: 'port',
      };
      const expectedAction = {
        type: ev.CONNECT,
        payload,
      };

      expect(actions.CLIENT_CONNECT(payload)).toEqual(expectedAction);
    });

    it('should create action - DISCONNECT', () => {
      const expectedAction = {
        type: ev.DISCONNECT,
        payload: {
          connected: false,
        },
      };
      expect(actions.CLIENT_DISCONNECT()).toEqual(expectedAction);
    });
  });

  describe('## App Actions Reducers - State', () => {
    const initialState = {
      connected: false,
      rooms: [],
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should handle APP_STATUS', () => {
      const action = {
        type: actions.APP_STATE,
        payload: {
          connected: true,
        },
      };
      const expectedState = {
        connected: true,
        rooms: [],
      };

      expect(reducer(undefined, action)).toEqual(expectedState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle APP_GET_ROOMS', () => {
      const action = {
        type: ev.res_ROOMS,
        payload: {
          rooms: [{ roomName: 'zboub' }],
        },
      };
      const expectedState = {
        connected: false,
        rooms: [{ roomName: 'zboub' }],
      };

      expect(reducer(undefined, action)).toEqual(expectedState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
