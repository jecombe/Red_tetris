import ev from '../../shared/events';
import logger from '../utils/logger';
import { emitToAll, emitToSocket, emitToRoom } from '../helpers/emitHelper';

import RedTetris from '../models';
// import redTetris from '../socket';

// const countdown = (req, res, count) => {
//   const { room } = req.data;

//   // logger.info('[start]', `romm ${room} start in ${count}s...`);

//   if (count > 0) {
//     // RedTetris.getGame(room).setMessage('server', `Game will start in ${count}`);

//     setTimeout(countdown, 1000, req, res, count - 1);

//     // RedTetris.emitToRoom(room, ev.res_START_GAME, {
//     //   status: 100,
//     //   payload: {
//     //     message: `Game will start in ${count}s...`,
//     //   },
//     // });
//   } else {
//     RedTetris.emitToRoom(room, ev.res_START_GAME, {
//       status: 200,
//       payload: {
//         message: 'Game started!',
//       },
//     });

//     // RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
//     //   status: 200,
//     //   payload: {
//     //     game: RedTetris.getGame(room),
//     //   },
//     // });
//   }
// };

const reqStart = async (req, res) => {
  const { name, room } = req.data;

  try {
    // if (!RedTetris.getGame(room) || !RedTetris.getGame(room).isOwner(name)) {
    //   throw new Error("Can't start game");
    // }

    // RedTetris.getGame(room).start(name);

    RedTetris.reqStart(req, res);
    emitToRoom(res.io, room, ev.res_START_GAME, {
      status: 200,
      payload: {
        message: 'Game started!',
      },
    });
    // RedTetris.emitToRoom(room, ev.res_UPDATE_GAME, {
    //   status: 200,
    //   payload: {
    //     game: RedTetris.getGame(room),
    //   },
    // });
    // setTimeout(countdown, 100, req, res, 3);
    logger.info('[reqStart] ', 'success');
  } catch (err) {
    logger.error('[reqStart] ', err);
    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      payload: {
        message: "Cant't start",
      },
    });
  }
};

const reqOwner = async (req, res) => {
  const { name, room, newOwner } = req.data;

  try {
    RedTetris.reqOwner(req, res);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME, {
      status: 200,
      message: '',
      payload: {
        game: RedTetris.getGame(room),
      },
    });
  } catch (err) {
    logger.error('[reqOwner] ', err);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      message: err,
      payload: {},
    });
  }
};

const reqChat = async (req, res) => {
  const { room, name, text } = req.data;

  try {
    RedTetris.reqChat(req, res);

    emitToRoom(res.io, room, ev.res_UPDATE_GAME_CHAT, {
      status: 200,
      payload: {
        chat: RedTetris.getGame(room).getMessages(),
      },
    });
  } catch (err) {
    logger.error('[reqChat] ', err);

    emitToSocket(req.socket, ev.res_UPDATE_PLAYER, {
      status: 500,
      message: err,
      payload: {},
    });
  }
};

export default {
  reqStart,
  reqOwner,
  reqChat,
};
