import ev from '../../../src/shared/events';
import reducer, { appState } from '../../../src/client/reducers/app';

describe('# Redux Tests - App Reducer', () => {
  const initialState = appState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_CONNECTION', () => {
    const action = {
      type: ev.UPDATE_CONNECTION,
      payload: {
        id: '1',
        connected: true,
        isLoading: false,
        snackbar: {
          message: '',
          variant: '',
        },
      },
    };
    const expectedState = {
      ...initialState,
      ...action.payload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_LOG', () => {
    const action = {
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: '',
          variant: '',
        },
      },
    };
    const expectedState = {
      ...initialState,
      ...action.payload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_INFOS', () => {
    const action = {
      type: ev.UPDATE_INFOS,
      payload: {
        nbPlayers: 1,
        nbGames: 1,
        games: { 1: true },
      },
    };
    const expectedState = {
      ...initialState,
      infos: {
        ...action.payload,
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

// import ev from '../../../src/shared/events';
// import * as actions from '../../../src/client/actions';
// import reducer from '../../../src/client/reducers/app';

// describe('# Redux Tests - App Reducer', () => {
//   // describe('## Actions Creators - App', () => {
//   //   it('should create action - APP_STATUS', () => {
//   //     const payload = { connected: true };
//   //     const expectedAction = {
//   //       type: actions.APP_STATE,
//   //       payload,
//   //     };
//   //     expect(actions.CLIENT_STATE(payload)).toEqual(expectedAction);
//   //   });

//   //   it('should create action - res_ROOMS', () => {
//   //     const payload = { rooms: [] };
//   //     const expectedAction = {
//   //       type: ev.res_ROOMS,
//   //       payload,
//   //     };
//   //     expect(actions.resRooms(payload)).toEqual(expectedAction);
//   //   });
//   // });

//   // describe('## App Reducer', () => {
//     const initialState = {
//       connected: false,
//       rooms: [],
//     };

//     it('should return the initial state', () => {
//       expect(reducer(undefined, {})).toEqual(initialState);
//     });
//     it('should handle APP_STATUS', () => {
//       const action = {
//         type: actions.APP_STATE,
//         payload: {
//           connected: true,
//         },
//       };
//       const expectedState = {
//         connected: true,
//         rooms: [],
//       };

//       expect(reducer(undefined, action)).toEqual(expectedState);
//       expect(reducer(initialState, action)).toEqual(expectedState);
//     });
//     it('should handle APP_GET_ROOMS', () => {
//       const action = {
//         type: ev.res_ROOMS,
//         payload: {
//           rooms: [{ room: 'zboub' }],
//         },
//       };
//       const expectedState = {
//         connected: false,
//         rooms: [{ room: 'zboub' }],
//       };

//       expect(reducer(undefined, action)).toEqual(expectedState);
//       expect(reducer(initialState, action)).toEqual(expectedState);
//     });
//   // });
// });
