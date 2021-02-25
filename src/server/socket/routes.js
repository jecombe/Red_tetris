import ev from '../../shared/events';

// import socketController from '../controllers/socket';
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
  // {
  //   event: 'error',
  //   handler: appController.error,
  // },
  // {
  //   event: ev.req_UPDATE_APP_INFOS,
  //   handler: appController.infos,
  // },
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
    handler: gameController.reqStart,
  },
  {
    event: ev.req_UPDATE_GAME_OWNER,
    handler: gameController.reqOwner,
  },
  {
    event: ev.req_UPDATE_GAME_CHAT,
    handler: gameController.reqChat,
  },
  {
    event: ev.req_UPDATE_PLAYER,
    handler: playerController.reqMove,
  },
];

export default routes;
