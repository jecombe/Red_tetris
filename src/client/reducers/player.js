import PropTypes from 'prop-types';
import ev from '../../shared/events';
import { TETROMINOS } from '../components/Game/tetrominos';

const playerState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  tetromino: TETROMINOS[0].shape,
  playerNextPiece: null,
};

export const playerStatePropTypes = PropTypes.shape({
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const playerReducer = (state = playerState, action) => {
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
