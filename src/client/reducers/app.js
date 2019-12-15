import PropTypes from 'prop-types';
import * as actions from '../actions';
import ev from '../../shared/events';

const appState = {
  connected: false,
  rooms: [],
};

export const appStatePropTypes = PropTypes.shape({
  connected: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
});

const appReducer = (state = appState, action) => {
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
