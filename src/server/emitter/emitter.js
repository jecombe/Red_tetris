import ev from '../../shared/events';

export const emitterStageOther = (redGame, stageOther, game) => {
    redGame.io.sockets.in(game.getGameName()).emit(ev.STAGE_OTHER, {
        otherStage: game.getAllStage(),
        //otherNotLosing: player.notLosing,
       // win: player.win,
        //playerOwner: player.owner,

    });
};

export const emitterMallus = (io, player) => {
    io.to(`${player.getIdSocket()}`).emit(ev.STAGE_MALLUS, {
        newStage: player.stage,
    });
};

export const emitterStageOtherMallus = (io, player, other) => {
    io.to(`${player.getIdSocket()}`).emit(ev.STAGE_OTHER, {
        otherStage: other.stage,
    });
};