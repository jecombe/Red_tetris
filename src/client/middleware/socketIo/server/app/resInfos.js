import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { nbPlayers, nbGames, games } = data;

  dispatch({
    type: ev.UPDATE_INFOS,
    payload: {
      nbPlayers,
      nbGames,
      games: Object.values(games),
    },
  });
};

export default {
  action: ev.res_UPDATE_APP_INFOS,
  dispatch,
};
