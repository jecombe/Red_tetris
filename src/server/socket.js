import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame , searchUserInList, searchRoomInUser} from './handlers/GameHandler';

const socketHandler = (io, userlist, rooms) => {

    io.on('connection', socket => {
        // console.log(socket);
        socket.emit('rooms', {
            'rooms': rooms
        });

        /*socket.on('login', info => {
            console.log('LOGIN', info)
            loginUser(socket, info, userlist)
        })*/

        socket.on('LoginUserGame', game => {
            console.log('---------- create user and create or join game ----------', game.username, game.roomActual)
            /*Create user =======> si on gere les switch de room alors, il faut checker si le user existe, alors changer de room, sinon creer le user*/
            let objPlayerBeforeGame = loginUser(socket, game.username, userlist)
            console.log('ONE: created user before game start ', objPlayerBeforeGame)
            /*Create or join game if existe*/
            const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, game.username, game.roomActual)
            console.log('- TWO: create game and add info in object Player') 
            console.log('- ObjectGame -> ', objGame)
            console.log('- Object PLayer after join or create game -> ' ,objPlayerAfterGame)
            /*Join room*/
            socket.join(game.gameName)

            /*A definir*/
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