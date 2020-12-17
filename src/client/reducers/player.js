import ev from '../../shared/events';

export const playerState = {
  name: '',
  score: 0,
  level: 0,
  lines: 0,
  mallus: 0,
  rank: 0,
  stage: null,
  piece: null,
  position: { x: 10 / 2 - 2, y: 0 },
  nbPiece: 0,
  loose: false,
  win: false,
};

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case ev.UPDATE_LOG: {
      const {
        name,
      } = action.payload;

      return {
        ...playerState,
        name,
      };
    }
    case ev.UPDATE_PLAYER_LOG: {
      const {
        player,
      } = action.payload;

      return {
        ...player,
      };
    }

    case ev.UPDATE_START_GAME: {
      const {
        player,
      } = action.payload;

      return {
        ...player,
        name: state.name,
      };
    }

    case ev.UPDATE_PLAYER: {
      const {
        player,
      } = action.payload;

      return {
        ...player,
      };
    }

    case ev.req_LOGOUT: {
      return {
        ...playerState,
      };
    }

    case ev.res_LOGOUT: {
      return {
        ...playerState,
      };
    }

    case ev.res_START_GAME: {
      const {
        stage, piece, level,
      } = action.payload;

      return {
        ...playerState,
        name: state.name,
        stage,
        piece,
        level,
      };
    }

    case ev.req_UPDATE_POSITION: {
      const {
        stage, piece, position,
      } = action.payload;

      return {
        ...state,
        stage,
        piece,
        position,
      };
    }

    case ev.req_COLLISION: {
      const {
        stage, piece, position, score, level, lines, nbPiece,
      } = action.payload;

      return {
        ...state,
        stage,
        piece,
        position,
        score,
        lines,
        level,
        nbPiece,
      };
    }

    case ev.req_UPDATE_MALLUS: {
      const { mallus, stage } = action.payload;

      return {
        ...state,
        mallus,
        stage,
      };
    }

    case ev.req_PLAYER_LOOSE: {
      return {
        ...state,
        loose: true,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
