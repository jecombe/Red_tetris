import socketIOClient from "socket.io-client";

const PORT = 8000;
const socket = socketIOClient(`http://localhost:${PORT}`);

export default socket;