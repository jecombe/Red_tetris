import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame } from './handlers/GameHandler';

const socketHandler = (io, userlist, rooms) => {
    io.on('connection', socket => {
        // console.log(socket);
        io.sockets.emit('rooms', {
            'rooms': rooms
        });

        socket.on('login', info => {
            playerLogin(socket.id, info.playerName, userlist);
        });

        socket.on('join', info => {
            roomJoin(info.roomName, info.playerName, rooms);
            io.sockets.emit('rooms', {
                'rooms': rooms
            });
            
        });

        socket.on('joinOrCreateGame', game => {
            createGame(game, rooms, userlist, socket)
            io.sockets.emit('joined', {
                'success': true,
                'rooms': rooms
            });
        })

        socket.on('startGame', game => {
            startGame(game)
        })

        socket.on('disconnect', () => {
            freeUserInGame(socket.id, rooms, userlist)
        });
    });
}

module.exports = socketHandler;