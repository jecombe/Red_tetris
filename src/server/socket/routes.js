import ev from '../../shared/events';
import { resLog } from '../actions/login';

import appController from '../controllers/app';
import gameController from '../controllers/game';
import playerController from '../controllers/player';

const routes = () => [
  {
    event: 'connect',
    handler: appController.connect,
  },
  {
    event: 'disconnect',
    handler: appController.disconnect,
  },
  {
    event: 'error',
    handler: appController.error,
  },
  {
    event: ev.req_UPDATE_APP_INFOS,
    handler: appController.infos,
  },
  {
    event: ev.req_LOGIN,
    handler: appController.login,
  },
  {
    event: ev.req_LOGOUT,
    handler: appController.logout,
  },
  {
    event: ev.req_START_GAME,
    handler: gameController.start,
  },
  {
    event: ev.req_UPDATE_GAME_OWNER,
    handler: gameController.owner,
  },
  {
    event: ev.req_UPDATE_GAME_CHAT,
    handler: gameController.chat,
  },
  {
    event: ev.req_UPDATE_PLAYER,
    handler: playerController.move,
  },
  // // { event: ev.req_PLAYER_LOOSE, handler: actions.resLoose },
  // {
  //   event: ev.req_START_GAME,
  //   handler: redGame.resStartGame.bind(redGame),
  // },
  // {
  //   event: ev.req_UPDATE_GAME_CHAT,
  //   handler: redGame.resChat.bind(redGame),
  // },
  // {
  //   event: ev.req_UPDATE_GAME_OWNER,
  //   handler: redGame.resOwner.bind(redGame),
  // },
  // { event: ev.req_PIECES, handler: actions.resPieces },
  // { event: ev.req_COLLISION, handler: actions.resUpdateCollision },
  // { event: ev.req_GAME_PLAYER, handler: actions.resGamePlayer },
  // { event: ev.req_MALLUS, handler: actions.resMallus },
];

export default routes;
