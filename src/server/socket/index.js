import socketIO from 'socket.io';

// import RedTetris from '../models';
import appController from '../controllers/app';

import routes from './routes';

const redTetris = (server) => {
  const io = socketIO(server, {
    pingInterval: 5000,
    pingTimeout: 15000,
  });

  // RedTetris.setIo(io);

  io.on('connect', (socket) => {
    appController.connect({ socket }, { io });

    routes().map((route) =>
      socket.on(route.event, (data, callback) => route.handler({ socket, data }, { io, callback })),
    );
  });
};

export default redTetris;
