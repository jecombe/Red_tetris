import ev from '../../shared/events';
import { flushUpdate, updateRows, updateStage } from '../../shared/stage';
import keys, { calcScore, calcLevel } from '../helpers/gameHelpers';

export const updatePlayer = (payload) => (dispatch, getState) => {
  const { id } = getState().app;

  dispatch({
    type: ev.UPDATE_PLAYER,
    payload: {
      player: payload.game.players[id],
    },
  });
};

export const reqPosition = (payload) => ({
  type: ev.req_POSITION,
  payload: {
    keyCode: payload.keyCode,
  },
});

const reqUpdatePosition = (payload) => ({
  type: ev.req_UPDATE_POSITION,
  payload: {
    stage: payload.stage,
    piece: payload.piece,
    position: payload.position,
  },
});

const reqUpdateCollision = (payload) => (dispatch, getState) => {
  const {
    stage, loose,
  } = payload;

  const {
    score, level, lines, nbPiece,
  } = getState().player;
  const { pieces } = getState().game;

  const updated = updateRows(stage);

  const nextPosition = { x: 10 / 2 - 2, y: 0 };
  const nextNbPiece = nbPiece + 1;
  const nextPiece = pieces[nextNbPiece];
  const nextStage = flushUpdate(nextPiece, updated.stage, nextPosition.x, nextPosition.y, false);
  const nextScore = score + calcScore(level, updated.lines);
  const nextLines = lines + updated.lines;
  const nextLevel = calcLevel(nextLines);

  dispatch({
    type: ev.req_COLLISION,
    payload: {
      stage: nextStage,
      piece: nextPiece,
      position: nextPosition,
      score: nextScore,
      lines: nextLines,
      level: nextLevel,
      nbPiece: nextNbPiece,
      updated,
    },
  });
};

const reqLoose = (payload) => (dispatch, getState) => {
  const {
    stage, position, gameOver, piece,
  } = payload;
  const {
    room, score, level, lines, nbPiece,
  } = getState().player;

  dispatch({
    type: ev.req_PLAYER_LOOSE,
    payload: {
      loose: payload.loose,
    },
  });

  // dispatch({
  //   type: ev.req_GAME_PLAYER,
  //   payload: {
  //     score,
  //     level,
  //     nbPiece,
  //     updated: {
  //       stage,
  //       lines: 0,
  //     },
  //     loose: payload.loose,
  //   },
  // });
};

export const reqMove = (payload) => ({
  type: ev.req_UPDATE_PLAYER,
  payload: {
    keyCode: payload.keyCode,
  },
});

export const reqMoveTetro = (payload) => (dispatch, getState) => {
  const { player } = getState();

  // const key = keys.find((i) => i.keyCode === payload.keyCode);
  const key = keys[payload.keyCode];

  if (key) {
    const {
      stage, piece, position, collided, loose,
    } = key.handler(player.stage, player.piece, player.position, key.dir, player.gameOver);

    if (collided) {
      if (loose) {
        dispatch(reqLoose({
          loose: true,
          stage,
        }));
      } else {
        dispatch(reqUpdateCollision({
          stage, loose,
        }));
      }
    } else {
      dispatch(reqUpdatePosition({
        stage, piece, position,
      }));
    }
  }
};

export const reqUpdateMallus = (payload) => (dispatch, getState) => {
  const state = getState();

  const { mallus } = payload;
  const {
    stage, piece, position, score, lines, level, nbPiece,
  } = state.player;

  let linesF = mallus; //+ lines;
  let newStage = stage.slice(linesF, 20);

  while (linesF !== 0) {
    newStage.push(new Array(10).fill(['M', 'mallus']));
    linesF -= 1;
  }

  // newStage = updateStage(piece, newStage, position.x, position.y, false);
  newStage = flushUpdate(piece, newStage, position.x, position.y, false);

  // dispatch({
  //   type: ev.req_UPDATE_MALLUS,
  //   payload: {
  //     mallus: lines + mallus,
  //     stage: newStage,
  //   },
  // });
  dispatch({
    type: ev.req_COLLISION,
    payload: {
      stage: newStage,
      piece,
      position,
      score,
      lines,
      level,
      nbPiece,
      updated: {
        stage: newStage,
        lines: 0,
      },
    },
  });
};
