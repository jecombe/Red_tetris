import PropTypes from 'prop-types';
import ev from '../../shared/events';
import { TETROMINOS } from '../components/Game/tetrominos';

export const playerState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  playerOtherStage: [],
  tetromino: TETROMINOS[0].shape,
  playerNextPiece: [],
  playerGameOver: false,
  otherNotLosing: -1,
  playerWin: false,
  playerOwner: false,
  playerLineFull: 0,
  playerDropTime: 0,
  actualPiece: null,
  pos: { x: 10 / 2 - 2, y: 0 },
  x: 10 / 2 - 2,
  y: 0,
};

export const playerStatePropTypes = PropTypes.shape({
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.array.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
  playerNextPiece: PropTypes.array.isRequired,
});

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case ev.req_LOGIN: {
      const { playerName, playerRoom, playerNextPiece } = action.payload;

      return {
        ...state,
        playerName,
        playerRoom,
        playerNextPiece,
      };
    }

    case ev.OBJ_PLAYER: {
      const { playerStage, playerNextPiece, playerOtherStage, playerOwner } = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerOtherStage,
        playerGameOver: false,
        playerOwner,
        playerDropTime: 1000,
      };
    }

    case ev.STAGE: {
      const { playerStage, playerNextPiece, playerGameOver, otherNotLosing, playerLineFull, actualPiece, pos} = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerGameOver,
        otherNotLosing,
        playerLineFull,
        actualPiece,
      };
    }
    case ev.UPDATE_POSITION: {
      const {x, y} = action.payload;

      return {
        ...state,
        x: state.x + x,
        y: state.y + y,
      };
    }

    case ev.UPDATE: {
      const {playerStage} = action.payload;

      return {
        ...state,
        playerStage,
      };
    }



    case ev.STAGE_MALLUS: {
      const { playerStage } = action.payload;
      return {
        ...state,
        playerStage,
        tetromino: TETROMINOS.I.shape,
      };
    }

    case ev.STAGE_OTHER: {
      const { playerOtherStage, otherNotLosing, playerWin, playerOwner } = action.payload;
      return {
        ...state,
        playerOtherStage,
        otherNotLosing,
        playerWin,
        playerOwner,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
