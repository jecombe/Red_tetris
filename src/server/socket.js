import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame , searchUserInList, searchRoomInUser} from './handlers/GameHandler';

const socketHandler = (io, userlist, rooms) => {

    io.on('connection', socket => {
        // console.log(socket);
        socket.emit('rooms', {
            'rooms': rooms
        });

        socket.on('login', info => {
            loginUser(socket, info, userlist)
        })

        socket.on('joinOrCreateGame', game => {
            createGame(game, rooms, userlist, socket)
            socket.join(game.gameName)

            io.sockets.emit('joined', {
                'success': true,
                'rooms': rooms
            });
        })
        
        socket.on('startGame', game => {
            console.log('RESPONSE: ', game)

            let piece = startGame(game, rooms)
            io.sockets.in(game.room).emit('pieceStart', piece);

        })

        socket.on('disconnect', () => {
            console.log('LIST ROOM BEFORE ', rooms, 'LIST USER BEFORE ', userlist)
            /*Search user login in userList*/
            let login = searchUserInList(socket.id, userlist)
            /*Search room name of player*/
            let roomActual = searchRoomInUser(userlist, login)
            socket.leave(roomActual)
            freeUserInGame(login, roomActual, rooms, userlist)
            console.log('LIST ROOM AFTER ', rooms, 'LIST USER AFTER ', userlist)
        });
    });
}

module.exports = socketHandler;