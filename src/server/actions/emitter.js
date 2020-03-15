import ev from '../../shared/events';

export const emitterStageOther = (redGame, stageOther, game) => {
  redGame.io.sockets.in(game.getGameName()).emit(ev.STAGE_OTHER, {
    otherStage: game.getAllStage(),
  });
};

export const emitterMallus = (io, player) => {
  io.to(`${player.getIdSocket()}`).emit(ev.STAGE_MALLUS, {
    newStage: player.getStage(),
    playerMallus: player.getMallus(),
  });
};


export const emitterUpdateCollision = (socketClient, player) => {
  socketClient.emit(ev.res_UPDATE_COLLISION, {
    piece: player.getPiece(),
    playerNextPiece: player.getNextPiece(),
    playerLineFull: player.getLineFull(),
  });
};


export const emitterStartGame = (newStage, nextPiece, otherNotLosing, position, collided, piece, redGame, playerRoom) => {
  redGame.io.sockets.in(playerRoom).emit(ev.STAGE, {
    newStage,
    nextPiece,
    gameOver: false,
    otherNotLosing,
    position,
    collided,
    piece,
  });
};

export const emitterLogin = (redGame, player, game, socketClient) => {
  redGame.io.to(`${socketClient.id}`).emit(ev.OBJ_PLAYER, {
    playerStage: player.getStage(),
    playerNextPiece: player.getNextPiece(),
    playerOtherStage: game.getAllStage(),
    playerOwner: player.owner,
  });
};

export const emitterWinner = (player, redGame) => {
  console.log('GO ', player);
  redGame.io.to(`${player.getIdSocket()}`).emit(ev.WINNER, {
    winner: true,
  });
};
