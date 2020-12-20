import { v4 as uuidv4 } from 'uuid';

import logger from '../utils/logger';
import ev from '../../shared/events';
import IoGame from '../models/IoGame';

import { resInfos } from './app';
import { resChat, resOwner } from './game';
//
//
//
//
//
// const currentRoom = Object.keys(redGame.io.sockets.adapter.sids[socket.id]).filter((item) => item !== socket.id)[0];

//
//
//
//

export const resLog = (req, res) => {
  console.log(IoGame);
};

export const resLogin = (socket, data, redGame, callback) => {
  try {
    const { name, room } = data;

    if (!name || !room || name.length > 15 || room.length > 15) throw new Error('Invalid name or room');
    if (redGame.getGame(room) && redGame.getGame(room).getStarted()) throw new Error('Game already started');
    if (redGame.getGame(room) && redGame.getGame(room).getPlayer(name)) throw new Error('Existing user with same name');

    socket.join(room);
    logger.info('socket:', socket.id, 'join room :', room);

    if (!redGame.getGame(room)) redGame.setGame(room, name);

    redGame.getGame(room).setPlayer(socket.id, name);

    /* Emit */

    redGame.emitToSocket(socket.id, ev.res_LOGIN, {
      player: {
        name: redGame.getGame(room).getPlayer(name).getName(),
      },
      game: {
        room: redGame.getGame(room).getRoom(),
        owner: redGame.getGame(room).getSettingsOwner(),
        players: redGame.getGame(room).getPlayers(),
        messages: redGame.getGame(room).getMessages(),
      },
    });

    if (redGame.getGame(room).isOwner(name)) resInfos(socket, {}, redGame);

    redGame.emitToRoomExceptSender(socket.id, room, ev.res_GAME_PLAYERS, {
      players: redGame.getGame(room).getPlayers(),
    });

    resChat(socket, {
      name: 'server',
      room,
      to: 'general',
      message: {
        id: uuidv4(),
        text: `${name} joined the room`,
        user: 'server',
        date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
      },
    }, redGame);

    callback('i\'m here!!!');
    // redGame.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
    //   id: uuidv4(),
    //   message: `${name} joined the room`,
    //   type: 'info',
    //   user: 'server',
    // });
    logger.info('[login]', 'success');
  } catch (err) {
    redGame.emitToSocket(socket.id, ev.res_LOGIN, {
      player: {
        name: '',
        room: '',
        logged: false,
      },
      game: {
        room: '',
        owner: false,
        players: {},
        messages: [],
      },
    });

    logger.error('[login] ', err);
  }
};

export const resLogout = (socket, data, redGame) => {
  try {
    const { name, room } = data;

    logger.info('[logout]', 'try to logout', name, 'in room', room);

    if (!name || !room) throw new Error('Player not logged');
    if (!redGame.getGame(room)) throw new Error('Room doesn\'t exist');
    if (!redGame.getGame(room).getPlayer(name)) throw new Error('Player doesn\'t exist in this room');

    socket.leave(room);
    logger.info('socket:', 'leave room :', room);

    redGame.getGame(room).unsetPlayer(name);

    if (Object.keys(redGame.getGame(room).getPlayers()).length === 0) {
      redGame.unsetGame(room);
    }

    /* Emit */

    if (redGame.getGame(room)) {
      redGame.emitToRoomExceptSender(socket.id, room, ev.res_LOGOUT, {
        players: redGame.getGame(room).getPlayers(),
      });

      resChat(socket, {
        name: 'server',
        room,
        to: 'general',
        text: `${name} left the room`,
      }, redGame);

      if (redGame.getGame(room).isOwner(name)) {
        resOwner(socket, { name, room, newOwner: '' }, redGame);
      }
    }

    resInfos(socket, {}, redGame);
  } catch (err) {
    // redGame.emitToSocket(socket.id, ev.res_LOGOUT, {
    //   players: redGame.getPlayers(),
    // });

    logger.error('[logout] ', err);
  }
};
