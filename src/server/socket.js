// import socketIO from 'socket.io';
import socketIo from 'socket.io';

import RedTetris from './models';
import appController from './controllers/app';

import routes from './socket/routes';

const redTetris = (server) => {
  const io = socketIo(server, {
    pingInterval: 5000,
    pingTimeout: 15000,
  });

  RedTetris.setIo(io);

  io.on('connect', (socket) => {
    appController.connect({ socket }, {});

    routes().map((route) => socket.on(
      route.event,
      (data, callback) => route.handler({ socket, data }, { callback }),
    ));
  });
};

export default redTetris;
