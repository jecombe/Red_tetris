import ev from '../../src/shared/events';
import * as actions from '../../src/client/actions';
import reducer from '../../src/client/reducers/player';
import { createStage, createStagePiece } from '../../src/server/stage/utils';
import { TETROMINOS } from '../../src/client/components/Game/tetrominos';

describe('# Redux Player Tests', () => {
  describe('## Player Actions', () => {
    it('should create action for get stages - APP_GET_STAGE', () => {
      const payload = { stage: createStage() };
      const expectedAction = {
        type: ev.OBJ_PLAYER,
        payload: {
          playerStage: payload.stage,
        },
      };
      expect(actions.appGetStage(payload)).toEqual(expectedAction);
    });
    it('should create action for update stage - UPDATE_STAGE', () => {
      const payload = {
        newStage: createStage(),
        nextPiece: createStagePiece(),
      };
      const expectedAction = {
        type: ev.STAGE,
        payload: {
          playerStage: payload.newStage,
          playerNextPiece: payload.nextPiece,
        },
      };
      expect(actions.updateStage(payload)).toEqual(expectedAction);
    });
    it('should create action for update stage mallus - UPDATE_STAGE_MALLUS', () => {
      const payload = {
        newStage: createStage(),
      };
      const expectedAction = {
        type: ev.STAGE_MALLUS,
        payload: {
          playerStage: payload.newStage,
        },
      };
      expect(actions.updateStageMallus(payload)).toEqual(expectedAction);
    });
  });

  describe('## Player Reducers', () => {
    const initialState = {
      playerName: null,
      playerRoom: null,
      playerSocket: null,
      playerStage: [],
      tetromino: TETROMINOS[0].shape,
      playerNextPiece: null,
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should handle APP_GET_STAGE', () => {
      const action = {
        type: ev.OBJ_PLAYER,
        payload: {
          playerStage: createStage(),
        },
      };
      const expectedState = {
        playerName: null,
        playerRoom: null,
        playerSocket: null,
        playerStage: action.payload.playerStage,
        tetromino: TETROMINOS[0].shape,
        playerNextPiece: null,
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle UPDATE_STAGE', () => {
      const action = {
        type: ev.STAGE,
        payload: {
          playerStage: createStage(),
          playerNextPiece: createStagePiece(),
        },
      };
      const expectedState = {
        playerName: null,
        playerRoom: null,
        playerSocket: null,
        playerStage: action.payload.playerStage,
        tetromino: TETROMINOS[0].shape,
        playerNextPiece: action.payload.playerNextPiece,
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle UPDATE_STAGE_MALLUS', () => {
      const action = {
        type: ev.STAGE_MALLUS,
        payload: {
          playerStage: createStage(),
        },
      };
      const expectedState = {
        playerName: null,
        playerRoom: null,
        playerSocket: null,
        playerStage: action.payload.playerStage,
        tetromino: TETROMINOS.L.shape,
        playerNextPiece: null,
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
