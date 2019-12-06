import io from 'socket.io-client';
import params from '../../../params';

const socket = io.connect(`${params.server.url}`);

export default socket;
