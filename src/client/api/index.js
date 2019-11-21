import socketIOClient from "socket.io-client";

const PORT = 8000;
const socket = socketIOClient(`http://localhost:${PORT}`, {
    pingInterval: 5000,
    pingTimeout: 15000
});

export default socket;