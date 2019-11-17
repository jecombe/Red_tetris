import { APPEND_MESSAGE, JUST_JOINED } from '../actions';

const initialState = {
    joined:null,
    userRoom: null,
    userList: [],
    user:null,
    roomList: [],
    messages:[]
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
       case APPEND_MESSAGE:
         const temp = [...state.messages,action.payload];
            return {
                ...state,
                messages:temp,
            };
    
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