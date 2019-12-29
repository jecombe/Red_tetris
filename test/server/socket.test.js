import 'regenerator-runtime/runtime';

const io = require('socket.io-client');
const server = require('../../src/server/server');
const ev = require('../../src/shared/events');
const logger = require('../../src/server/utils/logger');
// const socketServer = require('../../src/server/socket');

// socketServer(server);

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
const initSocket = () => new Promise((resolve, reject) => {
  // create socket for communication
  const socket = io('localhost:3000', {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
  });

  logger.info('connecting...');

  // define event handler for sucessfull connection
  socket.on('connect', () => {
    logger.info('connected');
    resolve(socket);
  });

  // if connection takes longer than 5 seconds throw error
  setTimeout(() => {
    reject(new Error('Failed to connect wihtin 5 seconds.'));
  }, 5000);
});

// destroySocket returns a promise
// success: resolve true
// fail: resolve false
const destroySocket = (socket) => new Promise((resolve) => {
  // check if socket connected
  if (socket.connected) {
    // logger.info('disconnecting...');
    socket.disconnect();
    resolve(true);
  } else {
    // not connected
    // logger.info('no connection to break...');
    resolve(false);
  }
});

describe('test suit: Echo & Bello', () => {
  test('test: ECHO', async () => {
    // create socket for communication
    const socketClient = await initSocket();

    // create new promise for server response
    const serverResponse = new Promise((resolve, reject) => {
      // define a handler for the test event
      socketClient.on(ev.res_ECHO, (data4Client) => {
        // process data received from server
        const { message } = data4Client;
        // logger.info(`Server says: ${message}`);

        // destroy socket after server responds
        destroySocket(socketClient);

        // return data for testing
        resolve(data4Client);
      });

      // if response takes longer than 5 seconds throw error
      setTimeout(() => {
        reject(new Error('Failed to get reponse, connection timed out...'));
      }, 5000);
    });

    // define data 4 server
    const data4Server = { message: 'CLIENT ECHO' };

    // emit event with data to server
    // logger.info('Emitting ECHO event');
    socketClient.emit(ev.req_ECHO, data4Server);

    // wait for server to respond
    const { status, message } = await serverResponse;

    // check the response data
    expect(status).toBe(200);
    expect(message).toBe('SERVER ECHO');
  });

  test('test BELLO', async () => {
    const socketClient = await initSocket();
    const serverResponse = new Promise((resolve, reject) => {
      socketClient.on(ev.res_BELLO, (data4Client) => {
        const { message } = data4Client;
        // logger.info(`Server says: ${message}`);
        destroySocket(socketClient);
        resolve(data4Client);
      });

      setTimeout(() => {
        reject(new Error('Failed to get reponse, connection timed out...'));
      }, 5000);
    });

    const data4Server = { message: 'CLIENT BELLO' };
    // logger.info('Emitting BELLO event');
    socketClient.emit(ev.req_BELLO, data4Server);

    const { status, message } = await serverResponse;
    expect(status).toBe(200);
    expect(message).toBe('SERVER BELLO');
  });

  test('test ROOMS', async () => {
    const socketClient = await initSocket();
    const serverResponse = new Promise((resolve, reject) => {
      socketClient.on(ev.res_ROOMS, (data4Client) => {
        const { message } = data4Client;
        // logger.info(`Server says: ${message}`);
        destroySocket(socketClient);
        resolve(data4Client);
      });

      setTimeout(() => {
        reject(new Error('Failed to get reponse, connection timed out...'));
      }, 5000);
    });

    const data4Server = { message: 'CLIENT ROOMS' };
    // logger.info('Emitting ROOMS event');
    socketClient.emit(ev.req_ROOMS, data4Server);

    const { status, message, games } = await serverResponse;
    expect(status).toBe(200);
    expect(message).toBe('SERVER ROOMS');
    expect(games).toEqual({});
  });
});
