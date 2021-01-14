import ev from '../../../src/shared/events';
import actions from '../../../src/client/actions';
import reducer, { gameState } from '../../../src/client/reducers/game';
// import { TETROMINOS } from '../../src/client/components/Game/tetrominos';
import { createStagePiece, createStage } from '../../../src/shared/stage';

describe('# Redux Tests - Game Reducer', () => {
    const initialState = gameState;

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle UPDATE_LOG', () => {
        const action = {
            type: ev.UPDATE_LOG,
            payload: {
                room: 'room'
            }
        };
        const expectedState = {
            ...initialState,
            ...action.payload
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_GAME', () => {
        const action = {
            type: ev.UPDATE_GAME,
            payload: {
                ...initialState,
                room: 'room'
            }
        };
        const expectedState = {
            ...action.payload.game
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_GAME_SETTINGS', () => {
        const action = {
            type: ev.UPDATE_GAME_SETTINGS,
            payload: {
                settings: {
                    ...initialState.settings,
                    owner: 'owner'
                }
            }
        };
        const expectedState = {
            ...initialState,
            settings: action.payload.settings
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_GAME_PLAYERS', () => {
        const action = {
            type: ev.UPDATE_GAME_PLAYERS,
            payload: {
                players: {
                    id: true
                }
            }
        };
        const expectedState = {
            ...initialState,
            players: action.payload.players
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_GAME_CHAT', () => {
        const action = {
            type: ev.UPDATE_GAME_CHAT,
            payload: {
                chat: {
                    id: true
                }
            }
        };
        const expectedState = {
            ...initialState,
            chat: action.payload.chat
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});

// import ev from '../../src/shared/events';
// import * as actions from '../../src/client/actions';
// import reducer, { gameState } from '../../src/client/reducers/reducers.types';
// // import { TETROMINOS } from '../../src/client/components/Game/tetrominos';
// import { createStagePiece, createStage } from '../../src/shared/stage';

// describe('# Redux Tests - Game Reducer', () => {
//   // describe('## Actions Reducers', () => {
//   //   it('should return the initial state', () => {
//   //     expect(reducer(undefined, {})).toEqual(gameState);
//   //   });

//   //   it('should handle res_LOGIN', () => {
//   //     const action = {
//   //       type: ev.CLIENT_CONNECTING,
//   //       payload: {
//   //         host: 'localhost',
//   //         port: 8080,
//   //       },
//   //     };

//   //     const payload = {
//   //       host: 'localhost',
//   //       port: 8080,
//   //     };

//   //     const expectedState = {
//   //       connected: false,
//   //       message: 'socket: Connecting...',
//   //       variant: 'info',
//   //       socketSnackbar: true,
//   //     };

//   //     // expect(reducer(undefined, action)).toEqual(expectedState);
//   //     // expect(reducer(socketState, action)).toEqual(expectedState);
//   //     expect(reducer(gameState, actions.reqConnect(payload))).toEqual(expectedState);
//   //   });
//   // });
//   describe('## Player Actions', () => {
//     it('should create action for get stages - APP_GET_STAGE', () => {
//       const payload = { stage: createStage() };
//       const expectedAction = {
//         type: ev.OBJ_PLAYER,
//         payload: {
//           stage: payload.stage,
//         },
//       };
//       expect(actions.resObjPlayer(payload)).toEqual(expectedAction);
//     });
//     it('should create action for update stage - UPDATE_STAGE', () => {
//       const payload = {
//         newStage: createStage(),
//         nextPiece: createStagePiece(),
//       };
//       const expectedAction = {
//         type: ev.STAGE,
//         payload: {
//           stage: payload.newStage,
//           nextPiece: payload.nextPiece,
//         },
//       };
//       expect(actions.updateStage(payload)).toEqual(expectedAction);
//     });
//     it('should create action for update stage mallus - UPDATE_STAGE_MALLUS', () => {
//       const payload = {
//         newStage: createStage(),
//       };
//       const expectedAction = {
//         type: ev.STAGE_MALLUS,
//         payload: {
//           stage: payload.newStage,
//         },
//       };
//       expect(actions.updateStageMallus(payload)).toEqual(expectedAction);
//     });
//     it('should create action - req_LOGIN', () => {
//       const payload = {
//         name: 'name',
//         playerRoom: 'playerRoom',
//       };
//       const expectedAction = {
//         type: ev.req_LOGIN,
//         payload,
//       };
//       expect(actions.reqLogin(payload)).toEqual(expectedAction);
//     });

//     it('should create action - POSITION_TETRO', () => {
//       const payload = {
//         keyCode: 'keyCode',
//       };
//       const expectedAction = {
//         type: ev.POSITION_TETRO,
//         payload,
//       };
//       expect(actions.reqSendPosition(payload)).toEqual(expectedAction);
//     });

//     it('should create action - START_GAME', () => {
//       const payload = {
//         name: 'name',
//         playerRoom: 'playerRoom',
//       };
//       const expectedAction = {
//         type: ev.req_START_GAME,
//         payload,
//       };
//       expect(actions.reqStartGame(payload)).toEqual(expectedAction);
//     });

//     it('should create action - OBJ_PLAYER', () => {
//       const payload = {
//         stage: 'stage',
//         nextPiece: 'nextPiece',
//         otherStage: 'otherStage',
//       };
//       const expectedAction = {
//         type: ev.OBJ_PLAYER,
//         payload,
//       };
//       expect(actions.resObjPlayer(payload)).toEqual(expectedAction);
//     });
//   });

//   describe('## Player Reducers', () => {
//     const initialState = {
//       name: null,
//       playerRoom: null,
//       playerSocket: null,
//       stage: [],
//       tetromino: TETROMINOS[0].shape,
//       nextPiece: null,
//     };

//     it('should return the initial state', () => {
//       expect(reducer(undefined, {})).toEqual(initialState);
//     });
//     it('should handle APP_GET_STAGE', () => {
//       const action = {
//         type: ev.OBJ_PLAYER,
//         payload: {
//           stage: createStage(),
//         },
//       };
//       const expectedState = {
//         name: null,
//         playerRoom: null,
//         playerSocket: null,
//         stage: action.payload.stage,
//         tetromino: TETROMINOS[0].shape,
//         nextPiece: null,
//       };

//       expect(reducer(initialState, action)).toEqual(expectedState);
//     });
//     it('should handle UPDATE_STAGE', () => {
//       const action = {
//         type: ev.STAGE,
//         payload: {
//           stage: createStage(),
//           nextPiece: createStagePiece(),
//         },
//       };
//       const expectedState = {
//         name: null,
//         playerRoom: null,
//         playerSocket: null,
//         stage: action.payload.stage,
//         tetromino: TETROMINOS[0].shape,
//         nextPiece: action.payload.nextPiece,
//       };

//       expect(reducer(initialState, action)).toEqual(expectedState);
//     });
//     it('should handle UPDATE_STAGE_MALLUS', () => {
//       const action = {
//         type: ev.STAGE_MALLUS,
//         payload: {
//           stage: createStage(),
//         },
//       };
//       const expectedState = {
//         name: null,
//         playerRoom: null,
//         playerSocket: null,
//         stage: action.payload.stage,
//         tetromino: TETROMINOS.L.shape,
//         nextPiece: null,
//       };

//       expect(reducer(initialState, action)).toEqual(expectedState);
//     });
//   });
// });
