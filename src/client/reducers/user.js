import { JUST_JOINED, ADD_ROOM } from '../actions';

const initialState = {
    joined:null,
    userRoom: null,
    userList: [],
    user:null,
    roomList: [],
    messages:[],
    rooms: []
};

const userReducer = (state = initialState, action) => {
    // console.log({action});
    console.log(action);

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
        default:
            return state;
    }
};

export default userReducer;