import ev from '../../shared/events';

export const emitterStageOther = (io, player) => {
    console.log("21212121212121212")

    io.to(`${player.getIdSocket()}`).emit(ev.STAGE_OTHER, {
        otherStage: player.otherStage,
        otherNotLosing: player.notLosing,
        win: player.win,
        playerOwner: player.owner,

    });
};

export const emitterMallus = (io, player) => {
    console.log("OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKO")
    io.to(`${player.getIdSocket()}`).emit(ev.STAGE_MALLUS, {
        newStage: player.stage,
    });
};

export const emitterStageOtherMallus = (io, player, other) => {
    console.log("222")

    io.to(`${player.getIdSocket()}`).emit(ev.STAGE_OTHER, {
        otherStage: other.stage,
    });
};