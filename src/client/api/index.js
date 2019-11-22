import io from "socket.io-client";

const PORT = 8000;
const socket = io.connect(`http://localhost:${PORT}`)
export default socket;