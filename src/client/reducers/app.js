import * as actions from '../actions';
import ev from '../../shared/events';

const initialState = {
  connected: false,
  rooms: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_STATE: {
      const { connected } = action.payload;

      return {
        ...state,
        connected,
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
