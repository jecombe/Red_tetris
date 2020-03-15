import PropTypes from 'prop-types';
import ev from '../../shared/events';

export const appState = {
  connected: false,
  isLoading: false,
  games: {},
};

export const appStatePropTypes = PropTypes.shape({
  connected: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  games: PropTypes.object.isRequired,
});

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ev.CLIENT_CONNECT: {
      return {
        ...state,
        connected: true,
      };
    }
    case ev.DISCONNECT: {
      return {
        ...state,
        connected: false,
      };
    }
    case ev.res_ROOMS: {
      const { games } = action.payload;
      return {
        ...state,
        games,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
