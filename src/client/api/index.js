import socketIOClient from "socket.io-client";

const PORT = 3011;
const socket = socketIOClient(`http://localhost:${PORT}`);

export default socket;