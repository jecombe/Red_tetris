import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame, searchUserInList, searchRoomInUser } from './handlers/GameHandler';
import { createStage } from './stage';
import { checkCollision } from '../client/helpers/gameHelpers';

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
const searchAllUser = (game, userlist) =>{
  console.log('userList ', userlist)
  for(var i= 0; i < game.users.length; i++)
{
  //console.log('-------------------__> ', game.users[i])
  let obj = objUser(userlist, game.users[i])
   obj.setPositionNull();

  obj.setPosition(10 / 2 - 2, 0)


}


}
const updateStage = (piece, obj, fct, gameActual, userlist) => {

    // First flush the stage
  if (fct)
  {
    obj.setStage(createStage());
  }

 // obj.setPositionNull();

  let usr = searchAllUser(gameActual, userlist)
  
    //obj.setPosition(10 / 2 - 2, 0)
    console.log('pUTIn ', obj.pos)
    const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
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


 

const updateStagee = (piece, obj, objGame) => {


  let newStage 
 
    if (objGame.userPiece && objGame.userPiece.length)
    {

        newStage = obj.stage
        objGame.setUserPieceNull()
        
    }
    else
    {

      newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    }

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
 const updatePlayerPos = ( x, y, obj, objGame) => {


    obj.setPosition(x.pos, y)

    const newStage = updateStagee(objGame.piece, obj, objGame)
    return newStage

  };

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
 
const updatePlayerPosDown = ( x, y, obj, objGame) => {


  if (objGame.userPiece && objGame.userPiece.length){

      objGame.setUserPieceNull()


  }
  console.log('ererererereerrrr> ', x, 'popopo ', y)
  console.log('2ererererereerrrr> ', obj.pos.x, '2popopo ', obj.pos.x)


  obj.setPosition(x, y)

  console.log('ererererereerrrr> ', obj.pos)

  //console.log('UPDATE DOWN ', obj.stage)

  const newStage = update(objGame.piece, obj, objGame)
  return newStage

  
};

const updateStageee = (piece, obj, start) => {

  // First flush the stage

  const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
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
  //console.log('NEW STAGE ', newStage)
  return newStage;
};



const updatePlayerPose = ( x, y, obj, objGame) => {

  //console.log('POSITION', x.pos , 'y ', y)
 //onsole.log('OBJECT BEFORE ', obj)

  obj.setPosition(x, y)
  ///console.log('OBJECT ', obj)
  const newStage = updateStageee(objGame.piece, obj,0)
  return newStage
  //const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  //console.log('new stage ', newStage)
  //const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
  /*setPlayer((prev) => ({
    ...prev,
    pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
    collided,
  }));*/
};






const updateStaging = (piece, obj) => {

  // First flush the stage

 // obj.setPositionNull();

  //obj.setPosition(10 / 2 - 2, 0)

  obj.setCollidedTrue()

  const newStage = obj.stage
    //onst newStagee = obj.stage.map((row) => row.map((cell) => (cell[0] === 'clear' ? [0, 'clear'] : cell)));

  //const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
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

  //console.log('NEW STAGE ', newStage)
  return newStage;
};

const updateStaging2 = (piece, obj) => {

  // First flush the stage

  obj.setPositionNull();
  obj.setCollidedFalse()

  
  obj.setPosition(10 / 2 - 2, 0)


  console.log('---stage before ', obj.stage)
  const newStage = obj.stage
    //onst newStagee = obj.stage.map((row) => row.map((cell) => (cell[0] === 'clear' ? [0, 'clear'] : cell)));

  //const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
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

  //console.log('NEW STAGE ', newStage)
  return newStage;
};











const socketHandler = (io, userlist, rooms) => {

    io.on('connection', socket => {
        io.emit('appGetRooms', {
            'rooms': rooms
        });

    

        socket.on('LoginUserGame', game => {
           // console.log('---------- create user and create or join game ----------', game.username, game.roomActual)
            /*Create user =======> si on gere les switch de room alors, il faut checker si le user existe, alors changer de room, sinon creer le user*/
            let objPlayerBeforeGame = loginUser(socket, game.username, userlist)
        
            //console.log('ONE: created user before game start ', objPlayerBeforeGame)
            /*Create or join game if existe*/
            
            const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, game.username, game.roomActual)
           // console.log('- TWO: create game and add info in object Player')
           /// console.log('- ObjectGame -> ', objGame)
           // console.log('- Object PLayer after join or create game -> ', objPlayerAfterGame)
            
            io.emit('appGetRooms', {
                'rooms': rooms
            });
            
            /*Join room*/
            socket.join(game.roomActual)

            /*A definir*/
            let stage = objPlayerAfterGame.stage
            io.to(`${socket.id}`).emit('objPlayer', {
                'stage': stage,
                'collided': false

            });
            io.sockets.emit('joined', {
                'success': true,
                'rooms': rooms
            });
        })

        socket.on('startGame', game => {

            let piece = startGame(game, rooms)
            io.sockets.in(game.room).emit('pieceStart', piece);
            let obj = objPlayer(userlist, socket.id)
            let objGame = objGaming(rooms, obj.roomAssociate)
            objGame.setNextPiece()
            //faire a tout les users une posisiton voulus
            io.sockets.in(game.room).emit('stage', {
                'newStage': updateStage(piece, obj, 1, objGame, userlist),
                'collided': false
            });




        })

        socket.on('playerMoveTetro', pos => {          
            let obj = objPlayer(userlist, socket.id)
            let objGame = objGaming(rooms, obj.roomAssociate)
            let ok = checkCollision(objGame.piece, obj, { x: pos.pos, y: 0 })
            if (!ok)
            {
    

              let newStage = updatePlayerPos(pos, 0, obj, objGame)
              
              obj.setStage(newStage)
              io.to(`${socket.id}`).emit('stage', {
                  'newStage': newStage,
                  'collided': false
  
              });
            }
            else{
              let newStage = updatePlayerPose(0, 0, obj, objGame)
              io.to(`${socket.id}`).emit('stage', {
                'newStage': newStage,
                'collided': true

            });

            }
          

        })

        socket.on('dropTetro', pos => {   
          
          console.log(pos)
          let obj = objPlayer(userlist, socket.id)
         // console.log('OOOOOBBBBJJJEEECCCCTTT ', obj)

          const roo = obj.getroomAssociate()
          console.log('roomAssociate ', roo)

          let objGame = objGaming(rooms, roo)

          let ok = checkCollision(objGame.piece, obj, { x: 0, y: pos.pos })

          if (!ok)
          {
            console.log('++++++++++++++++++++++++++++++++++++')
        
            let newStage = updatePlayerPosDown(0, pos.pos, obj, objGame)
            obj.setStage(newStage)
            
            io.to(`${socket.id}`).emit('stage', {
                'newStage': obj.stage,
                'collided': false

            });
          }
          else{
      

            let newStage = updateStaging(objGame.piece, obj)
            objGame.setPiece()
            objGame.setNextPiece()

            objGame.setUserPieceNull()
            objGame.setUserPiece(obj.login)
            let nouv = updateStaging2(objGame.piece, obj)
            obj.setStage(nouv)

          
            io.to(`${socket.id}`).emit('stage', {
              'newStage': obj.stage,
              'collided': true

          });

          }
        

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