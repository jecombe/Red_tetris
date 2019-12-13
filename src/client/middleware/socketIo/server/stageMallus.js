import ev from '../../../../shared/events';
import * as actions from '../../../actions';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log(data);
  dispatch({
    type: actions.UPDATE_STAGE_MALLUS,
    payload: { stage: data.newStage },
  });
};

export default {
  action: ev.STAGE_MALLUS,
  dispatch,
};
