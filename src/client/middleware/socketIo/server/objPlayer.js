import ev from '../../../../shared/events';
import * as actions from '../../../actions';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  console.log(data);
  dispatch({
    type: actions.APP_GET_STAGE,
    payload: data.stage,
  });
};

export default {
  action: ev.OBJ_PLAYER,
  dispatch,
};
