/*
 * action types
 */


/* this actions are from feature/client  */

export const ALERT_POP = 'ALERT_POP';
export const JUST_JOINED = 'JUST_JOINED';
export const ADD_ROOM = 'ADD_ROOM';

/*
 * action creators
 */

/* this actions creators are from feature/client  */

export const alertPop = alert => ({
    type: ALERT_POP,
    payload: alert
});

export const justJoined = (bool) => ({
    type: JUST_JOINED,
    payload: {
        success: bool.success,
        roomList: bool.roomList
        /*userRoom:bool.userRoom,
        user : bool.user,
        userList: bool.userList,
        roomList: bool.roomList*/
    }
});

export const addRoom = data => ({
    type: ADD_ROOM,
    payload: data
});
