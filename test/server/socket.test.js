import 'regenerator-runtime/runtime';

import { initSocket, destroySocket } from './helpers/socket';

const ev = require('../../src/shared/events');
const logger = require('../../src/server/utils/logger');

describe('test suit: Echo & Bello', () => {
  let socketClient;

  beforeAll(async () => {
    socketClient = await initSocket();
  });

  afterAll(() => {
    destroySocket(socketClient);
  });

  test('test: ECHO', async () => {
    // create socket for communication
    // const socketClient = await initSocket();

    // create new promise for server response
    const serverResponse = new Promise((resolve, reject) => {
      // define a handler for the test event
      socketClient.on(ev.res_LOGIN, (data4Client) => {
        // process data received from server
        // const { message } = data4Client;
        // logger.info(`Server says: ${data4Client}`);

        // destroy socket after server responds
        // destroySocket(socketClient);

        // return data for testing
        resolve(data4Client);
      });

      // if response takes longer than 5 seconds throw error
      setTimeout(() => {
        reject(new Error('Failed to get reponse, connection timed out...'));
      }, 10000);
    });

    // define data 4 server
    const data4Server = {
      name: 'name',
      room: 'room',
    };

    // emit event with data to server
    logger.info('Emitting ECHO event');
    socketClient.emit(ev.req_LOGIN, data4Server);

    // wait for server to respond
    const data = await serverResponse;
    logger.info(`Server says: ${data}`);

    // check the response data
    // expect(status).toBe(200);
    // expect(message).toBe('SERVER ECHO');
  });
});
