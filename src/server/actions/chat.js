// import ev from '../../shared/events';
// import logger from '../utils/logger';

// const ioDispatchHello = (socketClient) => {
//   // ECHO
//   socketClient.on(ev.req_ECHO, (data4Server) => {
//     const { message } = data4Server;
//     logger.info(`client says: ${message}`);
//     const data4Client = { status: 200, message: 'SERVER ECHO' };
//     socketClient.emit(ev.res_ECHO, data4Client);
//   });

//   // BELLO
//   socketClient.on(ev.req_BELLO, (data4Server) => {
//     const { message } = data4Server;
//     logger.info(`client says: ${message}`);
//     const data4Client = { status: 200, message: 'SERVER BELLO' };
//     socketClient.emit(ev.res_BELLO, data4Client);
//   });
// };

// module.exports = ioDispatchHello;
