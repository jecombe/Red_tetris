import ev from '../../../../shared/events';

export const dispatch = (socket, store, action) => {
    //console.log("=========++> ", action.payload.x);
    dispatch({
        type: ev.UPDATE_POSITION,
        payload: {
          x: action.payload.x,
          y: action.payload.y,
      
        },
      });
  };
  
  export default {
    action: ev.UPDATE_POSITION,
    dispatch,
  };
  