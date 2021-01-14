import ev from '../../../../../shared/events';
import { createStage, updateStage } from '../../../../../shared/stage';

import actions from '../../../../actions';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
    console.log(data);
    const { status, payload } = data;

    // const { settings } = payload;
    const { game } = payload;

    dispatch(actions.updatePlayer({ game }));

    // const piece = settings.pieces[0];
    // const position = { x: 10 / 2 - 2, y: 0 };
    // const stage = updateStage(piece, createStage(), position.x, position.y, false);

    // dispatch({
    //   type: ev.UPDATE_GAME_SETTINGS,
    //   payload: {
    //     settings,
    //   },
    // });

    // dispatch({
    //   type: ev.res_START_GAME,
    //   payload: {
    //     started,
    //     stage,
    //     piece,
    //     pieces,
    //     level: 1,
    //     dropTime,
    //   },
    // });
};

export default {
    action: ev.res_START_GAME,
    dispatch
};
