/*
 * action types
 */


/* this actions are from feature/client  */

export const ALERT_POP = 'ALERT_POP';
export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const SERVER_JOINROOM = 'JOIN_ROOM';
export const JUST_JOINED = 'JUST_JOINED';

/* this actions are from master  */

export const SERVER_JOIN_GAME = 'server/joinGame';
export const SERVER_LEAVE_GAME = 'server/leaveGame';
export const SERVER_SEND_PIECE = 'server/sendPiece';
export const SERVER_GET_PIECE = 'server/getPiece';

export const CLIENT_START_GAME = 'client/startGame';
export const CLIENT_DROP_PIECE = 'client/dropPiece';
export const CLIENT_INPUT = 'client/input';
export const CLIENT_FALL_PIECE = 'client/fallPiece';

/*
 * action creators
 */

/* this actions creators are from feature/client  */

export const alertPop = alert => ({
    type: ALERT_POP,
    payload: alert
});
 
export const appendMessage = message => ({
    type: APPEND_MESSAGE,
    payload: { ...message }
});

export const gameConnection = (data) => ({
    type: SERVER_JOINROOM,
    payload: data
});

export const justJoined = (bool) => ({
    type: JUST_JOINED,
    payload: {
        success: bool.success
        /*userRoom:bool.userRoom,
        user : bool.user,
        userList: bool.userList,
        roomList: bool.roomList*/
    }
});

/* this actions creators are from master  */

export const serverJoinGame = name => ({
    type: SERVER_JOIN_GAME,
    name
});

export const serverLeaveGame = name => ({
    type: SERVER_LEAVE_GAME,
    name
});

export const serverSendPiece = () => ({
    type: SERVER_SEND_PIECE
});

export const serverGetPiece = (gameName, playerName, board) => ({
    type: SERVER_GET_PIECE,
    gameName,
    playerName,
    board,
});

export const clientStartGame = () => ({
    type: CLIENT_START_GAME,
});

export const clientDropPiece = () => ({
    type: CLIENT_DROP_PIECE,
});

export const clientInput = input => ({
    type: CLIENT_INPUT,
    input,
  });

export const clientFallPiece = () => ({
    type: CLIENT_FALL_PIECE,
});
