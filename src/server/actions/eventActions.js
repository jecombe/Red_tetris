import { loginUser } from '../handlers/player/createPlayer';
import { startGaming } from '../handlers/game/startGame';
import { createGame } from '../handlers/game/createGame';
import { movementPlayer } from '../handlers/player/movementPlayer';
import { searchRoomInUser } from '../handlers/game/utils';
import { searchUserInList } from '../handlers/player/utils';
import { shareAction } from '../handlers/shareActions'
import { objPlayer, objGaming } from './utils'
import { updateStage } from '../handlers/game/stageGame'

export const actions = (socket, userlist, rooms, io) => {

  socket.on('LoginUserGame', (data) => loginUserGame(data, socket, userlist, rooms, io))

  socket.on('startGame', (data) => startGame(data, socket, userlist, rooms, io))

  socket.on('PositionTetro', (data) => positionTetro(data, socket, userlist, rooms, io))

  socket.on('disconnect', () => disconnect(socket, userlist, rooms))

}



const loginUserGame = (game, socket, userlist, rooms, io) => {
  let objPlayerBeforeGame = loginUser(socket, game.username, userlist)

  /* ----- Create a game if game is not created ----- */
  const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, game.username, game.roomActual)

  io.emit('appGetRooms', {
    'rooms': rooms
  });
  /*Join room*/
  socket.join(game.roomActual)

  io.to(`${socket.id}`).emit('objPlayer', {
    'stage': objPlayerAfterGame.stage,
  });
  io.sockets.emit('joined', {
    'success': true,
    'rooms': rooms
  });
}

const startGame = (game, socket, userlist, rooms, io) => {

  const [objPlayer, objGame] = startGaming(game, rooms, userlist)

  io.sockets.in(game.room).emit('stage', {
    'newStage': updateStage(objGame.tetro[0], objGame, userlist),
  });
}

const positionTetro = (keyCode, socket, userlist, rooms, io) => {

  let objUser = objPlayer(userlist, socket.id)
  let objGame = objGaming(rooms, objUser.roomAssociate)
  movementPlayer(keyCode.keyCode, objGame, objUser)

  io.to(`${socket.id}`).emit('stage', {
    'newStage': objUser.stage,
  });
}

const disconnect = (socket, userlist, rooms) => {

  /*Search user login in userList*/
  let login = searchUserInList(socket.id, userlist)
  /*Search room name of player*/
  let roomActual = searchRoomInUser(userlist, login)
  socket.leave(roomActual)
  shareAction(login, roomActual, rooms, userlist)
}