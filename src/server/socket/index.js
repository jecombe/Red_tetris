import ioDispatchHello from './echo';
import ioDispatchLogin from './login';
import ioDispatchGame from './game';

const ioEngine = (io, socketClient) => {
  const ioGame = {
    connections: [],
    rooms: [],
    userlist: [],
  };

  ioDispatchHello(socketClient);
  ioDispatchLogin(io, socketClient, ioGame);
  ioDispatchGame(io, socketClient, ioGame);
};

module.exports = ioEngine;
