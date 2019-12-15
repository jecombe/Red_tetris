import { loginUser } from '../handlers/player/createPlayer';
import { startGaming } from '../handlers/game/startGame';
import { createGame } from '../handlers/game/createGame';
import { movementPlayer } from '../handlers/player/movementPlayer';
import { searchRoomInUser } from '../handlers/game/utils';
import { searchUserInList } from '../handlers/player/utils';
import { shareAction } from '../handlers/shareActions';
import { objPlayer, objGaming } from './utils';
import { updateStage, printTetroStage } from '../handlers/game/stageGame';

import ev from '../../shared/events';


/*
 * actions login
 */

export const loginUserGame = (io, socketClient, ioGame, data) => {
  const { rooms, userlist } = ioGame;
  const { username, roomActual } = data;

  const objPlayerBeforeGame = loginUser(socketClient, username, userlist);
  /* ----- Create a game if game is not created ----- */
  const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, username, roomActual);

  io.emit(ev.res_ROOMS, {
    rooms,
  });

  /* Join room */
  socketClient.join(roomActual);

  io.to(`${socketClient.id}`).emit(ev.OBJ_PLAYER, {
    stage: objPlayerAfterGame.stage,
  });
};

export const disconnect = (socketClient, ioGame) => {
  const { rooms, userlist } = ioGame;

  /* Search user login in userList */
  const login = searchUserInList(socketClient.id, userlist);
  /* Search room name of player */
  const roomActual = searchRoomInUser(userlist, login);
  socketClient.leave(roomActual);
  shareAction(login, roomActual, rooms, userlist);
};

/*
 * actions game
 */

export const startGame = (io, socketClient, ioGame, data) => {
  const { rooms, userlist } = ioGame;
  const { room } = data;

  const [objPlayer, objGame] = startGaming(data, rooms, userlist);
  const stagePiece  = printTetroStage(objGame, userlist);
  io.sockets.in(room).emit(ev.STAGE, {
    newStage: updateStage(objGame.tetro[0], objGame, userlist),
    nextPiece: objPlayer.nextPiece,
  });
};

export const positionTetro = (io, socketClient, ioGame, data) => {
  const { rooms, userlist } = ioGame;
  const { keyCode } = data;

  const objUser = objPlayer(userlist, socketClient.id);
  const objGame = objGaming(rooms, objUser.roomAssociate);
  movementPlayer(keyCode, objGame, objUser, userlist, io, socketClient);
  io.to(`${socketClient.id}`).emit(ev.STAGE, {
    newStage: objUser.stage,
    nextPiece: objUser.nextPiece,
  });
};
