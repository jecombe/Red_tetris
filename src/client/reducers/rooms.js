import { ROOMS_GET } from '../actions';

const initialState = {
    rooms: []
};

const roomsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ROOMS_GET:
            return {
                ...state,
                rooms: action.payload.rooms
            };
        default:
            return state;
    }
};

export default roomsReducer;