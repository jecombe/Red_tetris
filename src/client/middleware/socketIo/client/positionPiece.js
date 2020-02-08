import ev from '../../../../shared/events';
import { checkCollision } from '../../../../server/helpers/gameHelpers';

export const dispatch = (socket, store, action, next) => {

    // store.dispatch({
    //     type: ev.UPDATE_POSITION,
    //     payload: {
    //       x: action.payload.x,
    //       y: action.payload.y,
      
    //     },
    //   });
  };
  
  export default {
    action: ev.UPDATE_POSITION,
    dispatch,
  };
  