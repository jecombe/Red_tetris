import socketMiddleware from 'socket.io-middleware';
import * as EVENTS from './socketIo';
import io from 'socket.io-client';
import params from '../../../params';

// export const socketClient = io.connect(`${params.server.url}`);
const initialSocket = null;

// export events as well for the unit tests
export const { client } = EVENTS;
export const { server } = EVENTS;
export const { state } = EVENTS;
export const socketId = 'CLIENT';

export default socketMiddleware(
  initialSocket,     /* unless a socket.io instance is already connected */
  EVENTS.client,
  EVENTS.server,
  EVENTS.state,
  socketId,           /* connect action to be sent by redux to initialize the socket */
  /* options */      /* this also serves as a unique idendifier for multiple socket applications */
);
