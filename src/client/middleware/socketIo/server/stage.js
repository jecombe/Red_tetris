import ev from '../../../../shared/events';
import * as actions from '../../../actions';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log(data);
  dispatch({
    type: actions.UPDATE_STAGE,
    payload: {
      stage: data.newStage,
      nextPiece: data.nextPiece,
    },
  });
};

export default {
  action: ev.STAGE,
  dispatch,
};
