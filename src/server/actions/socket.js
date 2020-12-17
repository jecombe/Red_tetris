import ev from '../../shared/events';
import logger from '../utils/logger';
// import { logout } from './login';

import { resInfos } from './app';

// export const socketConnect = (socket, redGame) => {
//   logger.info(`socket: ${socket.id} connected`);

//   redGame.setSocket(socket);

//   redGame.emitToAll(ev.res_UPDATE_APP_INFOS, {
//     nbPlayers: Object.keys(redGame.getSockets()).length,
//     nbGames: Object.keys(redGame.getGames()).length,
//     games: redGame.getGames(),
//   });

//   const currentRoom = Object.keys(redGame.io.sockets.adapter.sids[socket.id]).filter((item) => item !== socket.id)[0];


// };

// export const socketDisconnect = (socket, redGame) => {
//   // const { name, playerRoom, playerOwner } = data;

//   logger.info(`socket: ${socket.id} disconnected.`);

//   redGame.unsetSocket(socket);

//   if (redGame.getSocketRoom(socket)) {
//     // redGame.unsetPlayer(socket.id);
//     redGame.logout(socket);
//   }

//   redGame.emitToAll(ev.res_STATS, {
//     nbPlayers: Object.keys(redGame.getSockets()).length,
//     nbGames: Object.keys(redGame.getGames()).length,
//     games: redGame.getGames(),
//   });

//   // logger.info('We are in ioDispatchLogin for handle disconnect !');
//   // // redGame.unsetPlayer(socketClient.id);
//   // const player = redGame.getPlayer(socket.id);

//   // player.logout(redGame);
//   // logout(redGame, socket.id);
// };

export const socketError = (socket, redGame) => {
  logger.error(`Client ${socket.id} error.`);
};
