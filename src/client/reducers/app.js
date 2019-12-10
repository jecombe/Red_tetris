import { APP_STATUS, APP_GET_ROOMS } from '../actions';

const initialState = {
  connexion: false,
  rooms: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_STATUS:
      return {
        ...state,
        connexion: action.payload,
      };
    case APP_GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
