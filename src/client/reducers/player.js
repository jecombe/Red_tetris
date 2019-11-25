import { PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME, APP_GET_STAGE } from '../actions';
import { createStage } from '../../server/stage';
const initialState = {
    playerName: null,
    playerRoom: null,
    playerSocket: null,
    playerStage: []
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
                playerStage: action.payload
            };
        default:
            return state;
    }
};

export default playerReducer;