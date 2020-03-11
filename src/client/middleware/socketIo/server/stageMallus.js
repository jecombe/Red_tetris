import ev from '../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log("++++++++++++++++> ", data)
  dispatch({
    type: ev.STAGE_MALLUS,
    payload: {
      playerStage: data.newStage,
      playerMallus: data.playerMallus,
    },
  });
};

export default {
  action: ev.STAGE_MALLUS,
  dispatch,
};
