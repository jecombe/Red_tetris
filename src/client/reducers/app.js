import * as actions from '../actions';
import ev from '../../shared/events';

const initialState = {
  connexion: false,
  rooms: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_STATUS: {
      const { connexion } = action.payload;

      return {
        ...state,
        connexion,
      };
    }

    case ev.res_ROOMS: {
      const { rooms } = action.payload;

      return {
        ...state,
        rooms,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
