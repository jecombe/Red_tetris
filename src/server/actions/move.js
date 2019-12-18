// import { createStage, createStagePiece } from '../helpers/stage';
// import { updateStage, printTetroStage } from '../handlers/game/stageGame';
// import { checkCollision } from '../helpers/gameHelpers';
// import {
//   flushUpdate,
//   updatePlayerPosition,
//   updateStagingBeforeCollision,
//   updateStagingAfterCollision,
//   updatePlayerPositionCollision,
//   updateRows,
//   updateStagingAfterCollision1,
// } from '../handlers/player/stagePlayer';

export const terrain = (piece, stage) => {
  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${'clear'}`,
        ];
      }
    });
  });
  return newStage;
};

// export const moveDownTetro = (redGame, game, player) => {
//   const { io, socketClient, userlist } = ioGame;

//   if (!checkCollision(player, player.stage, { x: 0, y: 1 })) {
//     player.setStage(updatePlayerPosition(0, 1, player, game));
//   } else {
//     player.setIndex(player.index + 1);
//     player.setStage(updateStagingBeforeCollision(player.piece, player));
//     player.setStage(updateRows(player.stage, player, game, userlist, io, socketClient));
//     player.setPiece(game.tetro[player.index]);
//     if (!game.tetro[player.index + 1]) game.setTetro();
//     player.setStage(updateStagingAfterCollision(player.piece, player));

//     const stage = createStagePiece();
//     const piece = game.tetro[player.index + 1];
//     player.setPositionNull1();
//     player.setPosition1(10 / 2 - 2, 0);
//     player.setNextPiece(terrain(piece, stage));
//   }
// };


// const rotate = (matrix, dir) => {
//   // Make the rows to become cols (transpose)
//   const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
//   // Reverse each row to get a rotated matrix
//   if (dir > 0) return rotatedTetro.map((row) => row.reverse());
//   return rotatedTetro.reverse();
// };

// export const moveUpTetro = (player, dir) => {
//   const clonedPlayer = JSON.parse(JSON.stringify(player));
//   clonedPlayer.piece.form.shape = rotate(clonedPlayer.piece.form.shape, dir);
//   const pos = player.pos.x;
//   let offset = 1;
//   while (checkCollision(clonedPlayer, player.stage, { x: 0, y: 0 })) {
//     clonedPlayer.pos.x += offset;
//     offset = -(offset + (offset > 0 ? 1 : -1));
//     if (offset > clonedPlayer.piece.form.shape[0].length) {
//       rotate(clonedPlayer.piece.form.shape, -dir);
//       clonedPlayer.pos.x = pos;
//       return;
//     }
//   }
//   player.setPositionNull();
//   player.setPiece(clonedPlayer.piece);
//   player.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y);
//   player.setStage(flushUpdate(player.piece, player));
// };

// export const moveTetro = (game, player, pos) => {
//   if (!checkCollision(player, player.stage, { x: pos, y: 0 })) {
//     player.setStage(updatePlayerPosition(pos, 0, player, game));
//   } else {
//     player.setStage(updatePlayerPositionCollision(0, 0, player, game));
//   }
// };

// export const moveSpaceTetro = (game, player) => {
//   let i = 0;
//   let checkColl = false;

//   while (checkColl !== true) {
//     i += 1;
//     checkColl = checkCollision(player, player.stage, { x: 0, y: i });
//     checkColl = checkCollision(player, player.stage, { x: 0, y: i + 1 });
//   }
//   player.setStage(updatePlayerPosition(0, i, player, game));
//   player.setIndex(player.index + 1);
//   player.setStage(updateStagingBeforeCollision(player.piece, player));
//   player.setPiece(game.tetro[player.index]);
//   if (!game.tetro[player.index + 1]) {
//     game.setTetro();
//   }
//   player.setStage(updateStagingAfterCollision(player.piece, player));
// };
