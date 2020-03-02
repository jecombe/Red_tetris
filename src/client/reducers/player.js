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
  position: { x: 0, y: 0 },
  collided: false,
  piece: null,
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
      const { playerStage, playerNextPiece, playerOtherStage, playerOwner, } = action.payload;

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
      const { playerStage, playerNextPiece, playerGameOver, otherNotLosing, playerLineFull, position, collided, piece} = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerGameOver,
        otherNotLosing,
        playerLineFull,
        position,
        collided,
        piece,
      };
    }

    case ev.res_UPDATE_COLLISION: {
      const {piece, playerNextPiece} = action.payload;

      return {
        ...state,
        piece,
        position: {x: 10 / 2 - 2, y: 0},
        collided: false,
        playerNextPiece,
      };
    }
    case ev.req_UPDATE_COLLISION: {
      const {playerStage, x, y} = action.payload;

      return {
        ...state,
        playerStage,
         x: x,
         y: y,
         collided: true,
      };
    }


    case ev.UPDATE_POSITION: {
      const {x, y, playerStage, piece, collided} = action.payload;

      return {
        ...state,
        position: {x: x, y: y}, 
        playerStage,
        piece,
        collided,
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
