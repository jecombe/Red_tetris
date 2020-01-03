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
      };
    }

    case ev.STAGE: {
      const { playerStage, playerNextPiece, playerGameOver, otherNotLosing, } = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerGameOver,
        otherNotLosing,
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
