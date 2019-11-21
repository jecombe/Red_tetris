import { PLAYER_LOGIN } from '../actions';
import { createStage } from '../../server/stage';
const initialState = {
    playerName: null,
    playerRoom: null,
    playerSocket: null,
    playerStage: createStage()
};

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case PLAYER_LOGIN:
            return {
                ...state,
                playerName: action.payload.playerName,
                playerRoom: action.payload.playerRoom,
                playerSocket: action.payload.playerSocket,
                //playerStage: action.payload.palyerStage
            };
        default:
            return state;
    }
};

export default playerReducer;