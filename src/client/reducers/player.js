
import ev from '../../shared/events';
import { TETROMINOS } from '../components/Game/tetrominos';

const initialState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  tetromino: TETROMINOS[0].shape,
  playerNextPiece: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ev.req_LOGIN: {
      const { playerName, playerRoom } = action.payload;

      return {
        ...state,
        playerName,
        playerRoom,
      };
    }

    case ev.OBJ_PLAYER: {
      const { playerStage } = action.payload;

      return {
        ...state,
        playerStage,
      };
    }

    case ev.STAGE: {
      const { playerStage, playerNextPiece } = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
      };
    }

    case ev.STAGE_MALLUS: {
      const { playerStage } = action.payload;
      return {
        ...state,
        playerStage,
        tetromino: TETROMINOS.L.shape,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
