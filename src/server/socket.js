import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame, searchUserInList, searchRoomInUser } from './handlers/GameHandler';
import { createStage } from './stage';
import { checkCollision } from '../client/helpers/gameHelpers';





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


  const objGaming = (onlineGame, roomActual) => {
    let objGame
    onlineGame.find(obj => {
        if (obj.roomName == roomActual) {
            objGame = obj
            return objGame;
        }
    })
    return objGame;
}


const update = (piece, obj, objGame) => {


   let newStage 

     if (objGame.userPiece && objGame.userPiece.length)
     {
         newStage = obj.stage
         let y = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
         
     }
     else
     {
 
       newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
     }

     //console.log(piece)
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
    
     return newStage;
   };
 







const objUser= (userList, id) => {
  let objPlayer;
  userList.find(obj => {
      if (obj.login == id) {
          objPlayer = obj
          return objPlayer
      }
  })
  return objPlayer
}

const searchAllUser = (game, userlist, piece) =>{
  const stage = createStage()

  const newStage = stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${'clear'}`,
        ];
      }
    });
  });

  for(var i = 0; i < game.users.length; i++)
{
  let obj = objUser(userlist, game.users[i])
  obj.setPositionNull();
  obj.setPiece(piece)
  obj.setPosition(10 / 2 - 2, 0)
  obj.setStage(newStage)
}

return newStage
}


const updateStage = (piece, gameActual, userlist) => {

const newStage = searchAllUser(gameActual, userlist, piece)

 
  return newStage;
};







const updatePlayerPosDown = ( x, y, obj, objGame) => {


  if (objGame.userPiece && objGame.userPiece.length){
      objGame.setUserPieceNull()
  }
  obj.setPosition(x, y)

  const newStage = update(obj.piece, obj, objGame)
  return newStage

  
};





const updateStaging = (piece, obj) => {


  obj.setCollidedTrue()

  const newStage = obj.stage
 
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + obj.pos.y][x + obj.pos.x] = [
          value,
          `${'merged'}`,
        ];
      }
    });
  });

  return newStage;
};


const updateStaging2 = (piece, obj) => {

  // First flush the stage

  obj.setPositionNull();
  obj.setCollidedFalse()

  
  obj.setPosition(10 / 2 - 2, 0)


  const newStage = obj.stage

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


  return newStage;
};


const socketHandler = (io, userlist, rooms) => {

    io.on('connection', socket => {
        io.emit('appGetRooms', {
            'rooms': rooms
        });

    
        socket.on('dropTetro', pos => {   
          
          let obj = objPlayer(userlist, socket.id)
          const room = obj.getroomAssociate()
          let objGame = objGaming(rooms, room)

          let ok = checkCollision(obj.piece, obj, { x: 0, y: pos.pos })
          if (!ok)
          {
            let newStage = updatePlayerPosDown(0, pos.pos, obj, objGame)
            obj.setStage(newStage)
          }
          else{
            obj.setIndex(obj.index + 1)
            console.log('+++++++++++++++++++++++++++++++++> ', obj.index)

            console.log('+++++++++++++++++++++++++++++++++> ', objGame.tetro)

            const st = updateStaging(obj.piece, obj)
            obj.setStage(st)
            obj.setPiece(objGame.tetro[obj.index])
            if (objGame.tetro[obj.index + 1])
            {

            }
            else{
              objGame.setTetro()
            }
            //console.log('+++++++++++++++++++++++++++++++++> ', pbjGame.tetro)
            
            /*else{
              objGame.
              console.log('EXISTE PAS')
            }*/
            //objGame.setUserPiece(obj.login)
            //objGame.setPiece()
            //objGame.setNextPiece()
            //obj.setPiece(objGame.piece)
            let nouv = updateStaging2(obj.piece, obj)
            obj.setStage(nouv)
          }
               
          io.to(`${socket.id}`).emit('stage', {
            'newStage': obj.stage,

        });
        

      })

        socket.on('LoginUserGame', game => {
           // console.log('---------- create user and create or join game ----------', game.username, game.roomActual)
            /*Create user =======> si on gere les switch de room alors, il faut checker si le user existe, alors changer de room, sinon creer le user*/
            let objPlayerBeforeGame = loginUser(socket, game.username, userlist)
        
    
            
            const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, game.username, game.roomActual)
       
            
            io.emit('appGetRooms', {
                'rooms': rooms
            });
            
            /*Join room*/
            socket.join(game.roomActual)

            /*A definir*/
            let stage = objPlayerAfterGame.stage
            io.to(`${socket.id}`).emit('objPlayer', {
                'stage': stage,

            });
            io.sockets.emit('joined', {
                'success': true,
                'rooms': rooms
            });
        })

        socket.on('startGame', game => {

            const [objPlayer, objGame] = startGame(game, rooms, userlist)

            console.log('TETRO -> ', objGame.tetro)
            //objGame.setNextPiece()
            //faire a tout les users une posisiton voulus
            io.sockets.in(game.room).emit('stage', {
                'newStage': updateStage(objGame.tetro[0], objGame, userlist),
            });
        })


    socket.on('disconnect', () => {
       // console.log('LIST ROOM BEFORE ', rooms, 'LIST USER BEFORE ', userlist)
        /*Search user login in userList*/
        let login = searchUserInList(socket.id, userlist)
        /*Search room name of player*/
        let roomActual = searchRoomInUser(userlist, login)
        socket.leave(roomActual)
        freeUserInGame(login, roomActual, rooms, userlist)
       // console.log('LIST ROOM AFTER ', rooms, 'LIST USER AFTER ', userlist)
    });
});
}

module.exports = socketHandler;