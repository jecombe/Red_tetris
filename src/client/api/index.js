import io from 'socket.io-client';
import params from '../../../params';

export const client = io.connect(`${params.server.url}`);

const CLIENT_STATUS = 'client/status';
const CLIENT_ROOMS = 'client/rooms';

export const event = {
  CLIENT_STATUS,
  CLIENT_ROOMS,
};

// const socket = {
//   client: io.connect(`${params.server.url}`),
//   event: {
//     CLIENT_STATUS,
//     CLIENT_ROOMS,
//   },
// };

// module.exports = socket;
