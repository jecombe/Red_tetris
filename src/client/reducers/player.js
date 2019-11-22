import { PLAYER_LOGIN, PLAYER_LOGIN_ENTER_GAME } from '../actions';
import { createStage } from '../../server/stage';
const initialState = {
    playerName: null,
    playerRoom: null,
    playerSocket: null,
    playerStage: createStage()
};

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case PLAYER_LOGIN_ENTER_GAME:
            return {
                ...state,
                playerName: action.payload.username,
                playerRoom: action.payload.roomActual,
                playerSocket: action.payload.playerSocket,
                //playerStage: action.payload.palyerStage
            };
        default:
            return state;
    }
};

export default playerReducer;