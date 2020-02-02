import PropTypes from 'prop-types';
import ev from '../../shared/events';

export const appState = {
  connected: false,
  host: '',
  port: 0,
  error: false,
  isLoading: false,
  message: '',
  logged: false,
  games: {},
};

export const appStatePropTypes = PropTypes.shape({
  connected: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  games: PropTypes.object.isRequired,
});

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ev.SOCKET_CONNECT: {
      const { connected, host, port } = action.payload;
      return {
        ...state,
        connected,
        host,
        port,
      };
    }
    case ev.SOCKET_DISCONNECT: {
      const { connected } = action.payload;
      return {
        ...state,
        connected,
      };
    }
    case ev.req_LOGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ev.res_LOGIN: {
      const { error, message, logged } = action.payload;
      return {
        ...state,
        error,
        isLoading: false,
        message,
        logged,
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
