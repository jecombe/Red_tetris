import { JUST_JOINED, ADD_ROOM, PLAYER_LOGIN } from '../actions';

const initialState = {
    joined:null,
    userRoom: null,
    userList: [],
    user:null,
    roomList: [],
    messages:[],
    rooms: [],
    playerName: null,
    playerRoom: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case JUST_JOINED:
            return {
                ...state,
                joined:action.payload.success,
                roomList: action.payload.roomList
            };
        case ADD_ROOM:
            return {
                ...state,
                rooms: state.rooms.concat(action.payload)
            };
        case PLAYER_LOGIN:
            return {
                ...state,
                playerName: action.payload.playerName,
                playerRoom: action.payload.playerRoom
            };
        default:
            return state;
    }
};

export default userReducer;