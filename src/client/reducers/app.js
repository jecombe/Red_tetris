import PropTypes from 'prop-types';
import * as actions from '../actions';
import ev from '../../shared/events';

export const appState = {
  connected: false,
  rooms: [],
  games: {},
};

export const appStatePropTypes = PropTypes.shape({
  connected: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  games: PropTypes.object.isRequired,
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
      const { rooms, games } = action.payload;
      return {
        ...state,
        rooms,
        games,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
