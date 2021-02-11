// import { v4 as uuidv4 } from 'uuid';

// import logger from '../utils/logger';
// import ev from '../../shared/events';

// import { resInfos } from './app';

// import {
//   flushUpdate,
//   createStagePiece,
//   updateStage,
//   createStage,
// } from '../../shared/stage';
// import { emitterUpdateCollision, emitterStartGame } from './emitter';

// const printPiece = (piece) => {
//   let row = '';

//   console.log('Piece form shape length: ', piece.form.shape.length);
//   // console.log('Piece form shape [y] length: ', piece.form.shape[y].length);

//   for (let y = 0; y < piece.form.shape.length; y += 1) {
//     for (let x = 0; x < piece.form.shape[y].length; x += 1) {
//       row += piece.form.shape[y][x];
//     }
//     console.log(row);
//     row = '';
//   }
//   console.log('');
// };

// const printStage = (stage) => {
//   let row = '';

//   for (let y = 0; y < stage.length; y += 1) {
//     for (let x = 0; x < stage[y].length; x += 1) {
//       row += stage[y][x][0];
//     }
//     console.log(row);
//     row = '';
//   }
//   console.log('');
// };

// const debug = (redGame, room) => {
//   const piece = redGame.getGame(room).getTetros()[0];
//   const piece2 = redGame.getGame(room).getTetros()[1];

//   printPiece(piece);

//   const stage = createStage();

//   const stage2 = updateStage(piece, stage, 5, 5, true);

//   const stage3 = updateStage(piece, stage2, 0, 0, false);
//   const stage32 = flushUpdate(piece2, stage2, 0, 0, false);

//   printStage(stage3);
//   printStage(stage32);

//   // printStage(updateStage(redGame.getGame(room).getTetros()[0], createStage(), 0, 0, false));
// };

// function countdown(socket, data, redGame, count) {
//   console.log(`ARMING IN ${count}`);
//   // count -= 1;
//   if (count > 0) {
//     redGame.emitToRoom(data.room, ev.res_UPDATE_GAME_CHAT, {
//       to: 'general',
//       message: {
//         id: uuidv4(),
//         text: `Game will begin in ${count} seconds !!!`,
//         user: 'server',
//         date: `${new Date().getHours()}h : ${
//           new Date().getMinutes() < 10 ? '0' : ''
//         }${new Date().getMinutes()}`,
//       },
//     });

//     setTimeout(countdown, 1000, socket, data, redGame, count - 1);
//   } else {
//     redGame.emitToRoom(data.room, ev.res_UPDATE_GAME_CHAT, {
//       to: 'general',
//       message: {
//         id: uuidv4(),
//         text: 'Game started !!!',
//         user: 'server',
//         date: `${new Date().getHours()}h : ${
//           new Date().getMinutes() < 10 ? '0' : ''
//         }${new Date().getMinutes()}`,
//       },
//     });

//     redGame.emitToRoom(data.room, ev.res_START_GAME, {
//       started: redGame.getGame(data.room).getStarted(),
//       pieces: redGame.getGame(data.room).getTetros(),
//     });

//     resInfos(socket, {}, redGame);
//   }
// }

// export const resStartGame = async (socket, data, redGame) => {
//   const { name, room } = data;

//   try {
//     if (
//       !redGame.getGame(room).isOwner(name)
//       || redGame.getGame(room).getStarted()
//     ) {
//       throw new Error("You can't start the game");
//     }

//     redGame.getGame(room).setStarted(true);
//     redGame.getGame(room).setTetroNull();
//     redGame.getGame(room).setTetro();
//     redGame.getGame(room).setTetro();
//     redGame.getGame(room).setTetro();
//     redGame.getGame(room).setLoosersNull();

//     // debug(redGame, room);

//     /* Emit */
//     countdown(socket, data, redGame, 3);

//     // setTimeout(countdown, 1000, socket, data, redGame, 3);

//     // redGame.emitToRoom(room, ev.res_START_GAME, {
//     //   started: redGame.getGame(room).getStarted(),
//     //   pieces: redGame.getGame(room).getTetros(),
//     // });

//     // resInfos(socket, {}, redGame);
//   } catch (err) {
//     redGame.emitToRoom(room, ev.res_START_GAME, {
//       started: redGame.getGame(room).getStarted(),
//       pieces: redGame.getGame(room).getTetros(),
//       dropTime: redGame.getGame(room).getDropTime(),
//     });

//     logger.error('[game] ', err);
//   }
// };

// export const resChat = (socket, data, redGame) => {
//   const {
//     name, room, to, message,
//   } = data;

//   // const message = {
//   //   id: uuidv4(),
//   //   text,
//   //   user: name,
//   //   date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
//   // };

//   redGame.emitToRoomExceptSender(socket.id, room, ev.res_UPDATE_GAME_CHAT, {
//     to,
//     message,
//   });

//   // if (to === 'general') {
//   //   redGame.getGame(room).setMessage(message);

//   //   redGame.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
//   //     to: 'general',
//   //     messages: redGame.getGame(room).getMessages(),
//   //   });
//   // } else {
//   //   redGame.emitToRoom(room, ev.res_UPDATE_GAME_CHAT, {
//   //     to,
//   //     messages: [message],
//   //   });
//   // }
// };

// export const resOwner = (socket, data, redGame) => {
//   try {
//     const { name, room, newOwner } = data;

//     if (!redGame.getGame(room).isOwner(name)) {
//       throw new Error('Not owner of room');
//     }

//     if (newOwner === '') {
//       redGame.getGame(room).setRandomOwner();
//     } else {
//       redGame.getGame(room).setOwner(newOwner);
//     }

//     redGame.emitToRoom(room, ev.res_UPDATE_GAME_OWNER, {
//       owner: redGame.getGame(room).getSettingsOwner(),
//     });

//     resChat(
//       socket,
//       {
//         name: 'server',
//         room,
//         text: `${redGame.getGame(room).getSettingsOwner()} is the new owner`,
//       },
//       redGame,
//     );

//     logger.info('[game] Owner of room ', room, 'is now ', newOwner);
//   } catch (err) {
//     logger.error('[game] ', err);

//     redGame.emitToSocket(socket.id, ev.res_UPDATE_GAME_OWNER, {
//       owner: redGame.getGame(data.room).getSettingsOwner(),
//     });
//   }
// };

// export const resGamePlayer = (socket, data, redGame) => {
//   const {
//     room, player, nbPiece, mallus,
//   } = data;

//   // redGame.getGame(room).setPlayer(player);

//   redGame.emitToRoom(room, ev.res_GAME_PLAYER, {
//     player,
//   });

//   if (!redGame.getGame(room).getTetros()[nbPiece + 2]) {
//     redGame.getGame(room).setTetro();

//     redGame.emitToRoom(room, ev.res_PIECES, {
//       pieces: redGame.getGame(room).getTetros(),
//     });
//   }

//   if (mallus > 1) {
//     redGame.emitToRoomExceptSender(socket.id, room, ev.res_MALLUS, {
//       mallus,
//     });
//   }
// };

// export const resUpdateCollision = (socket, data, redGame) => {
//   const {
//     name, room, score, level, lines, stage, loose,
//   } = data;

//   redGame.getGame(room).getPlayer(name).setScore(score);
//   redGame.getGame(room).getPlayer(name).setLevel(level);
//   redGame.getGame(room).getPlayer(name).setStage(stage);
//   redGame.getGame(room).getPlayer(name).setLoose(loose);
//   redGame.getGame(room).getPlayer(name).setLines(lines);

//   /* Update player for others */
//   redGame.emitToRoom(room, ev.res_COLLISION, {
//     player: redGame.getGame(room).getPlayer(name),
//   });

//   /* Set mallus */
//   // redGame.emitToRoomExceptSender(socket.id, room, ev.res_MALLUS, {
//   //   mallus: lines,
//   // });
//   // game.setMallusToPlayers(redGame, lines, player);

//   // emitterUpdateCollision(socket, player);
// };

// export const resPieces = (socket, data, redGame) => {
//   const { room, nbPieces } = data;

//   if (!redGame.getGame(room).getTetros()[nbPieces + 2]) {
//     redGame.getGame(room).setTetro();
//   }

//   redGame.emitToRoom(room, ev.res_PIECES, {
//     pieces: redGame.getGame(room).getTetros(),
//   });
// };

// export const resMallus = (socket, data, redGame) => {
//   const { room, mallus } = data;

//   redGame.emitToRoomExceptSender(socket.id, room, ev.res_MALLUS, {
//     mallus,
//   });
// };

// export const resLoose = (socket, data, redGame) => {
//   const { name, room } = data;

//   redGame.getGame(room).getPlayer(name).setLoose(true);
//   redGame.getGame(room).setLoosers();

//   if (
//     redGame.getGame(room).getLoosers()
//     === Object.keys(redGame.getGame(room).getPlayers()).length
//   ) {
//     redGame.getGame(room).setStarted(false);
//     redGame.emitToRoom(room, ev.res_GAME_END, {});
//   }
// };

// const resGameOver = (socket, data, redGame) => {};

// // export const resMallus = (socket, data, redGame) => {
// //   const { room, lines } = data;

// //   console.log(room, lines);

// //   redGame.emitToRoomExceptSender(socket.id, room, ev.res_MALLUS, {
// //     lines,
// //   });
// // };

// // export const resUpdateCollision = (socket, data, redGame) => {
// //   const {
// //     stage, room, lines, gameOver,
// //   } = data;

// //   if (gameOver) return resGameOver(socket, data, redGame);

// //   redGame.getGame(room).setPlayerCollision(socket.id, data);

// //   /* Update player for others */
// //   redGame.emitToRoom(room, ev.res_GAME_PLAYERS, {
// //     players: redGame.getGame(room).getPlayers(),
// //   });

// //   /* Set mallus */
// //   // redGame.emitToRoomExceptSender(socket.id, room, ev.res_MALLUS, {
// //   //   mallus: lines,
// //   // });
// //   // game.setMallusToPlayers(redGame, lines, player);

// //   // emitterUpdateCollision(socket, player);
// // };

// // export const resUpdateCollision = (socket, data, redGame) => {
// //   const {
// //     stage, playerRoom, lines, gameOver,
// //   } = data;
// //
// //   const game = redGame.getGame(playerRoom);
// //   const player = redGame.getGame(playerRoom).getPlayer(socket.id);
// //   if (gameOver === true) {
// //
// //     player.setGameOver();
// //     game.deleteUser(socket.id);
// //     game.checkUserWin(redGame);
// //
// //   }
// //   player.setStage(stage);
// //   player.setLineFull(lines);
// //   game.setMallusToPlayers(redGame, lines, player);
// //   player.setIndex(player.index + 1);
// //   player.setPiece(game.pieces[player.index]);
// //   if (!game.pieces[player.index + 1]) game.setTetro();
// //   player.setNextPiece(flushUpdate(game.pieces[player.index + 1], createStagePiece(), player.getPositionX(), player.getPositionY()));
// //   emitterUpdateCollision(socket, player);
// // };

// export const positionTetro = (data, redGame, socket) => {
//   const { keyCode, playerRoom } = data;

//   const game = redGame.getGame(playerRoom);
//   const player = redGame.getGame(playerRoom).getPlayer(socket.id);

//   player.positionTetro(keyCode, game, redGame);
//   redGame.io.to(`${socket.id}`).emit(ev.STAGE, {
//     stage: player.getStage(),
//     nextPiece: player.getNextPiece(),
//     gameOver: player.getLosing(),
//     otherNotLosing: player.notLosing,
//     win: player.win,
//     lines: player.getLineFull(),
//   });
// };
