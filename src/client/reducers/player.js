import { PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME, APP_GET_STAGE, APP_GET_PIECE_START, UPDATE_STAGE} from '../actions';
import {TETROMINOS} from '../components/tetrominos'
import { createStage } from '../../server/stage';
const initialState = {
    playerName: null,
    playerRoom: null,
    playerSocket: null,
    playerStage: [],
    playerPieceStart: null,
    collided: false,
    tetromino: TETROMINOS[0].shape,
    pos: { x: 0, y: 0 },
    test:null

};

const updateStage = (prevStage, state) => {

    console.log('COUCOU', state)
    // First flush the stage
    /*const newStage = state.playerStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

    state.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + player.pos.y][x + player.pos.x] = [
            value,
            `${player.collided ? 'merged' : 'clear'}`,
          ];
        }
      });
    });
    return newStage;*/
  };
const playerReducer = (state = initialState, action) => {

    console.log('ICICICICICICICICICICI ', action.payload)
    switch(action.type) {
        case PLAYER_LOGIN_ENTER_GAME:
            return {
                ...state,
                playerName: action.payload.username,
                playerRoom: action.payload.roomActual,
                playerSocket: action.payload.playerSocket,
                //playerStage: action.payload.palyerStage
            };

            case APP_GET_STAGE:
            return {
                ...state,
                playerStage: action.payload.stage,
                collided: action.payload.collided
            };
            case APP_GET_PIECE_START:
            return {
                ...state,
                playerPieceStart: action.payload,
                pos: { x: 10 / 2 - 2, y: 0 },
                tetromino: action.payload,
                test: updateStage(action.payload)

            };
            case UPDATE_STAGE:
            return {
                ...state,
                playerStage: action.payload
                

            };
        default:
            return state;
    }
};

export default playerReducer;