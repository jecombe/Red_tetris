import ev from '../../shared/events';

export const resInfos = (redGame) => {
  redGame.emitToAll(ev.res_UPDATE_APP_INFOS, {
    nbPlayers: Object.keys(redGame.getSockets()).length,
    nbGames: Object.keys(redGame.getGames()).length,
    games: redGame.getGames(),
  });
};

export default {
  resInfos,
};
