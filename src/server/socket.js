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
            loginUser(socket, info, userlist)
        })

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
            console.log('LIST ROOM BEFORE ', rooms, 'LIST USER BEFORE ', userlist)
            freeUserInGame(socket.id, rooms, userlist)
            console.log('LIST ROOM AFTER ', rooms, 'LIST USER AFTER ', userlist)
        });
    });
}

module.exports = socketHandler;