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
    case ev.UPDATE_PLAYER: {
      const { player } = action.payload;

      return {
        ...player,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
