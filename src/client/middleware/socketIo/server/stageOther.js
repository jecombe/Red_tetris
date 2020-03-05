import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  dispatch({
    type: ev.STAGE_OTHER,
    payload: {
      playerOtherStage: data.otherStage,
    //  otherNotLosing: data.otherNotLosing,
    //  playerWin: data.win,
      //playerOwner: data.playerOwner,
    },
  });
};

export default {
  action: ev.STAGE_OTHER,
  dispatch,
};
