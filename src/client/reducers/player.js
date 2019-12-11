import {
  PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME, APP_GET_STAGE, APP_GET_PIECE_START, UPDATE_STAGE,
} from '../actions';
import { TETROMINOS } from '../components/Game/tetrominos';
import { createStage } from '../../server/helpers/stage';

const initialState = {
  playerName: null,
  playerRoom: null,
  playerSocket: null,
  playerStage: [],
  tetromino: TETROMINOS[0].shape,
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

      };
    case UPDATE_STAGE:
      return {
        ...state,
        playerStage: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
