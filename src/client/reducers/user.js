import { JUST_JOINED } from '../actions';

const initialState = {
    joined:null,
    userRoom: null,
    userList: [],
    user:null,
    roomList: [],
    messages:[]
};

const userReducer = (state = initialState, action) => {
    console.log({action});

    switch(action.type) {
        case JUST_JOINED:
            return {
                ...state,
                joined:action.payload.success,
                roomList: action.payload.roomList
            };
    
        default:
            return state;
    }
};

export default userReducer;