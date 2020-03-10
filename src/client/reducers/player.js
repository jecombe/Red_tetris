import PropTypes from 'prop-types';
import ev from '../../shared/events';
import { TETROMINOS } from '../components/Game/tetrominos';

export const playerState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  playerOtherStage: [],
  playerMallus: 0,
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
  startGame: false,
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
        playerOwner,
        playerDropTime: 1000,
        playerLineFull: 0,
      };
    }

    case ev.STAGE: {
      const { playerStage, playerNextPiece, playerGameOver, otherNotLosing, position, collided, piece} = action.payload;

      return {
        ...state,
        playerStage,
        playerNextPiece,
        playerGameOver,
        otherNotLosing,
        position,
        collided,
        piece,
        playerLineFull: 0,
        playerGameOver:  false,
        playerWin: false,
        startGame: true,
      };
    }

    case ev.res_UPDATE_COLLISION: {
      const {piece, playerNextPiece, playerLineFull} = action.payload;

      return {
        ...state,
        piece,
        position: {x: 10 / 2 - 2, y: 0},
        collided: false,
        playerNextPiece,
        playerLineFull,
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
      const {x, y, playerStage, piece, collided, playerGameOver} = action.payload;

      return {
        ...state,
        position: {x: x, y: y}, 
        playerStage,
        piece,
        collided,
        playerGameOver,
        
      };
    }

    case ev.STAGE_MALLUS: {

      const { playerStage, playerMallus} = action.payload;
      return {
        ...state,
        playerStage,
        tetromino: TETROMINOS.I.shape,
        playerMallus
      };
    }

    case ev.STAGE_OTHER: {
      const { playerOtherStage } = action.payload;
      return {
        ...state,
        playerOtherStage,

      };
    }

    case ev.WINNER: {
      const { winner} = action.payload;
      return {
        ...state,
        playerWin: winner,
  
      };
    }
    case ev.START_GAME: {
      console.log("PASSE DEDAND")

      return {
        ...state,
        startGame: false,
  
      };

    }

    default:
      return state;
  }

  
};

export default playerReducer;
