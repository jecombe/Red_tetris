import ev from '../../src/shared/events';
import actions from '../../src/client/actions';
import reducer, { playerState } from '../../src/client/reducers/player';
import { createStage, createStagePiece } from '../../src/server/stage/utils';
import { TETROMINOS } from '../../src/client/components/Game/tetrominos';

describe('# Redux Tests - Player', () => {
  const initialState = playerState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('## Game', () => {
    it('should reduce - OBJ_PLAYER', () => {
      const payload = {
        playerStage: createStage(),
        playerNextPiece: createStagePiece(),
        playerOtherStage: [],
        playerOwner: true,
      };
      const expectedAction = {
        type: ev.OBJ_PLAYER,
        payload,
      };
      const expectedState = {
        ...initialState,
        playerStage: payload.playerStage,
        playerNextPiece: payload.playerNextPiece,
        playerOtherStage: [],
        playerOwner: true,
      };

      expect(actions.player.resObjPlayer(payload)).toEqual(expectedAction);
      expect(reducer(initialState, expectedAction)).toEqual(expectedState);
    });

    it('should reduce - STAGE', () => {
      const payload = {
        playerStage: createStage(),
        playerNextPiece: createStagePiece(),
        playerGameOver: false,
        otherNotLosing: false,
        playerLineFull: false,
      };
      const expectedAction = {
        type: ev.STAGE,
        payload: {
          playerStage: payload.newStage,
          playerNextPiece: payload.nextPiece,
        },
      };
      expect(actions.player.updateStage(payload)).toEqual(expectedAction);
    });

    it('should create action for update stage mallus - STAGE_MALLUS', () => {
      const payload = {
        newStage: createStage(),
      };
      const expectedAction = {
        type: ev.STAGE_MALLUS,
        payload: {
          playerStage: payload.newStage,
        },
      };
      expect(actions.player.updateStageMallus(payload)).toEqual(expectedAction);
    });

    it('should create action - POSITION_TETRO', () => {
      const payload = {
        keyCode: 'keyCode',
      };
      const expectedAction = {
        type: ev.POSITION_TETRO,
        payload,
      };
      expect(actions.player.reqSendPosition(payload)).toEqual(expectedAction);
    });

    it('should create action - START_GAME', () => {
      const payload = {
        playerName: 'playerName',
        playerRoom: 'playerRoom',
      };
      const expectedAction = {
        type: ev.START_GAME,
        payload,
      };
      expect(actions.player.reqStartGame(payload)).toEqual(expectedAction);
    });
  });
});
