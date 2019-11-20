import { PLAYER_LOGIN } from '../actions';

const initialState = {
    playerName: null,
    playerRoom: null,
    playerSocket: null
};

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case PLAYER_LOGIN:
            return {
                ...state,
                playerName: action.payload.playerName,
                playerRoom: action.payload.playerRoom,
                playerSocket: action.payload.playerSocket
            };
        default:
            return state;
    }
};

export default playerReducer;