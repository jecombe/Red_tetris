import {
  PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME, APP_GET_STAGE, APP_GET_PIECE_START, UPDATE_STAGE, UPDATE_STAGE_MALLUS, UPDATE_OTHER_STAGE, DELETE_ARRAY
} from '../actions';
import { TETROMINOS } from '../components/Game/tetrominos';
import { createStage } from '../../server/stage';

const initialState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  playerOtherStage: [],
  tetromino: TETROMINOS[0].shape,
  playerNextPiece: null
};

const playerReducer = (state = initialState, action) => {
  console.log('ACTION REDUCER ', state)
  switch (action.type) {
    case PLAYER_LOGIN_ENTER_GAME:
      return {
        ...state,
        playerName: action.payload.username,
        playerRoom: action.payload.roomActual,
        playerSocket: action.payload.playerSocket,
        // playerStage: action.payload.palyerStage
      };

    case APP_GET_STAGE:
      return {
        ...state,
        playerStage: action.payload.stage,
        playerNextPiece: null,
        playerOtherStage: action.payload.otherStage

      };
    case UPDATE_STAGE:
      
      return {
        ...state,
        playerStage: action.payload.stage,
        playerNextPiece: action.payload.nextPiece


      };
      case UPDATE_OTHER_STAGE:
      
        return {
          ...state,
          playerOtherStage: action.payload.otherStage
  
  
        };
      case UPDATE_STAGE_MALLUS:
      
        return {
          ...state,
          playerStage: action.payload.stage,
          tetromino: TETROMINOS['L'].shape,
  
  
        };
    default:
      return state;
  }
};

export default playerReducer;
