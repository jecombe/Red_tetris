import ev from '../../src/shared/events';
import * as actions from '../../src/client/actions';
import reducer from '../../src/client/reducers/app';

describe('# Redux App Tests', () => {
  describe('## App Actions', () => {
    it('should update connexion to true - APP_STATUS', () => {
      const payload = { connected: true };
      const expectedAction = {
        type: actions.APP_STATE,
        payload,
      };
      expect(actions.CLIENT_STATE(payload)).toEqual(expectedAction);
    });
    it('should update rooms array - APP_GET_ROOMS', () => {
      const payload = { rooms: [] };
      const expectedAction = {
        type: ev.res_ROOMS,
        payload,
      };
      expect(actions.resRooms(payload)).toEqual(expectedAction);
    });
  });

  describe('## App Reducers', () => {
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
