import { APP_CONNECTED, APP_DISCONNECTED, APP_GET_ROOMS } from '../actions';

const initialState = {
  connexion: false,
  rooms: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_CONNECTED:
      return {
        ...state,
        connexion: true,
      };
    case APP_DISCONNECTED:
      return {
        ...state,
        connexion: false,
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
