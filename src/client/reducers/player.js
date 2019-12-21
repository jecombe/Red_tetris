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
      const { playerStage, playerNextPiece, playerOtherStage } = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerOtherStage,
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

    case ev.STAGE_OTHER: {
      const { playerOtherStage } = action.payload;
      return {
        ...state,
        playerOtherStage,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
