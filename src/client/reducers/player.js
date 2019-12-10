import {
  PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME, APP_GET_STAGE, APP_GET_PIECE_START, UPDATE_STAGE,
} from '../actions';
import { TETROMINOS } from '../components/Game/tetrominos';
import { createStage } from '../../server/stage';

const initialState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  tetromino: TETROMINOS[0].shape,
  playerNextPiece: null
};

const playerReducer = (state = initialState, action) => {

  console.log('LLALALLALALAA ', action.payload)
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
        playerNextPiece: null

      };
    case UPDATE_STAGE:
      
      return {
        ...state,
        playerStage: action.payload.stage,
        playerNextPiece: action.payload.nextPiece


      };
    default:
      return state;
  }
};

export default playerReducer;
