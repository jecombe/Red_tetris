import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame, searchUserInList, searchRoomInUser } from './handlers/GameHandler';
import { createStage } from './stage';

const updateStage = (piece, obj) => {

    // First flush the stage
    console.log(obj.stage)
    obj.setPosition(10 / 2 - 2, 0)
    const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    console.log(piece)
    piece.form.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + obj.pos.y][x + obj.pos.x] = [
            value,
            `${obj.collided ? 'merged' : 'clear'}`,
          ];
        }
      });
    });
    console.log('NEW STAGE ', newStage)
    return newStage;
  };

  const objPlayer = (userList, id) => {
    let objPlayer;
    userList.find(obj => {
        if (obj.idSocket == id) {
            objPlayer = obj
            return objPlayer
        }
    })
    return objPlayer
}

const socketHandler = (io, userlist, rooms) => {

    io.on('connection', socket => {
        io.emit('appGetRooms', {
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
            console.log('- Object PLayer after join or create game -> ', objPlayerAfterGame)
            
            io.emit('appGetRooms', {
                'rooms': rooms
            });
            
            /*Join room*/
            socket.join(game.roomActual)

            /*A definir*/
            //console.log(objPlayerAfterGame.stage)
            let stage = objPlayerAfterGame.stage
            io.to(`${socket.id}`).emit('objPlayer', {
                'stage': stage

            });
            io.sockets.emit('joined', {
                'success': true,
                'rooms': rooms
            });
        })

        socket.on('startGame', game => {
            console.log('RESPONSE: ', game.room)

            let piece = startGame(game, rooms)
            io.sockets.in(game.room).emit('pieceStart', piece);
            let obj = objPlayer(userlist, socket.id)
            io.sockets.in(game.room).emit('stage', {
                'newStage': updateStage(piece, obj)

            });




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