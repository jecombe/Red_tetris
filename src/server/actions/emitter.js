// import ev from '../../shared/events';

// export const emitterStageOther = (redGame, game) => {
//   redGame.io.sockets.in(game.getRoom()).emit(ev.STAGE_OTHER, {
//     otherStage: game.getAllStage(),
//   });
// };

// export const emitterMallus = (io, player) => {
//   io.to(`${player.getId()}`).emit(ev.STAGE_MALLUS, {
//     newStage: player.getStage(),
//     mallus: player.getMallus(),
//   });
// };

// export const emitterUpdateCollision = (socketClient, player) => {
//   socketClient.emit(ev.res_UPDATE_COLLISION, {
//     piece: player.getPiece(),
//     nextPiece: player.getNextPiece(),
//     lines: player.getLineFull(),
//   });
// };

// export const emitterStartGame = (
//   newStage,
//   nextPiece,
//   otherNotLosing,
//   position,
//   collided,
//   piece,
//   redGame,
//   playerRoom,
// ) => {
//   redGame.io.sockets.in(playerRoom).emit(ev.STAGE, {
//     newStage,
//     nextPiece,
//     gameOver: false,
//     otherNotLosing,
//     position,
//     collided,
//     piece,
//   });
// };

// export const emitterLogin = (redGame, player, game, socketClient) => {
//   redGame.io.to(`${socketClient.id}`).emit(ev.res_LOGIN, {
//     // stage: player.getStage(),
//     // nextPiece: player.getNextPiece(),
//     // otherStage: game.getAllStage(),
//     playerOwner: player.owner,
//   });
//   // redGame.io.to(`${socketClient.id}`).emit(ev.OBJ_PLAYER, {
//   //   stage: player.getStage(),
//   //   nextPiece: player.getNextPiece(),
//   //   otherStage: game.getAllStage(),
//   //   playerOwner: player.owner,
//   // });
// };

// export const emitterWinner = (player, redGame) => {
//   redGame.io.to(`${player.getId()}`).emit(ev.WINNER, {
//     winner: true,
//   });
// };
