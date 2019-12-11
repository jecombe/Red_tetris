import {
  PLAYER_LOGIN_ENTER_GAME,
  APP_GET_STAGE,
  UPDATE_STAGE,
  UPDATE_STAGE_MALLUS,
} from '../actions';
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

      };
    case UPDATE_STAGE:
      return {
        ...state,
        playerStage: action.payload.stage,
        playerNextPiece: action.payload.nextPiece,
      };
    case UPDATE_STAGE_MALLUS:
      return {
        ...state,
        playerStage: action.payload.stage,
        tetromino: TETROMINOS.L.shape,
      };
    default:
      return state;
  }
};

export default playerReducer;
