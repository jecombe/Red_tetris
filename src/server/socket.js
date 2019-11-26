import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame, searchUserInList, searchRoomInUser } from './handlers/GameHandler';
import { createStage } from './stage';
import { checkCollision } from '../client/helpers/gameHelpers';

const updateStage = (piece, obj, fct) => {

    // First flush the stage
  if (fct)
  {
    obj.setStage(createStage());
  }
    obj.setPositionNull();
  
    obj.setPosition(10 / 2 - 2, 0)
    const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
   // console.log(piece)
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
   // console.log('NEW STAGE ', newStage)
    return newStage;
  };


 

const updateStagee = (piece, obj, objGame) => {


 // console.log('OBJ STAGE BEFORE' ,obj.stage, 'PIECE ', piece, 'OBJ GAME ', objGame)
  let newStage 
    // First flush the stage
    //console.log('=:=:=:=:=:=:=:=:==:=> ', piece, '2 ', obj, '3 ',start)
    //console.log(obj.stage)
    //const newStage = obj.stage
    //const newStage = obj.stage
    if (objGame.userPiece && objGame.userPiece.length)
    {
      //console.log('EST LA')
        newStage = obj.stage
        objGame.setUserPieceNull()
        
    }
    else
    {
      //console.log('EST LA LALALALAL')

      newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    }
//console.log('1------------------------------------()=> ', obj.stage)
    //newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
   // console.log('2------------------------------------()=> ', newStage)


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
    //onsole.log('OBJ STAGE AFTER' , newStage)

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

    //console.log('POSITION', x.pos , 'y ', y)
   //onsole.log('OBJECT BEFORE ', obj)

    obj.setPosition(x.pos, y)

    ///console.log('OBJECT ', obj)
    const newStage = updateStagee(objGame.piece, obj, objGame)
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


  // console.log('OBJ STAGE BEFORE' ,obj.stage, 'PIECE ', piece, 'OBJ GAME ', objGame)
   let newStage 
     // First flush the stage
     //console.log('=:=:=:=:=:=:=:=:==:=> ', piece, '2 ', obj, '3 ',start)
     //console.log(obj.stage)
     //const newStage = obj.stage
     //const newStage = obj.stage
     if (objGame.userPiece && objGame.userPiece.length)
     {
       //console.log('EST LA')
         newStage = obj.stage
         let y = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

         console.log('positon ', obj.pos)
         console.log('yyyyyyyyyyyy ', y)

        // newStage = obj.stage.map((row) => row.map((cell) => (cell)));
         
     }
     else
     {
       //console.log('EST LA LALALALAL')
 
       newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
     }
 //console.log('1------------------------------------()=> ', obj.stage)
    // newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
 
 
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
     //onsole.log('OBJ STAGE AFTER' , newStage)
   console.log('2------------------------------------()=> ', newStage)

     return newStage;
   };
 
const updatePlayerPosDown = ( x, y, obj, objGame) => {

  //obj.setPositionNull();

  //obj.setPosition(x, y.pos)
  console.log('objgmae ', objGame.userPiece)
  if (objGame.userPiece && objGame.userPiece.length){

  //obj.setPositionNull();
  objGame.setUserPieceNull()

  console.log('positoin,', obj.pos, ' collided ' , obj.collided, )
  //obj.setPositionNull();

  //objGame.setUserPieceNull()

  }
  else{

  }

  obj.setPosition(x, y)

  //console.log('UPDATE DOWN ', obj.stage)
  console.log('COUCOU ', obj.stage)

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

  console.log('+_+_+_+_+_+_+_+_+_+_+_+_+_+_+>>>> ', obj.pos)
  obj.setCollidedTrue()

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
  console.log('---stage after ', newStage)

  //console.log('NEW STAGE ', newStage)
  return newStage;
};

const updateStaging2 = (piece, obj) => {

  // First flush the stage

  obj.setPositionNull();
  obj.setCollidedFalse()

  
  obj.setPosition(10 / 2 - 2, 0)

  console.log('+_+_+_+_+_+_+_+_+_+_+_+_+_+_+>>>> ', obj.pos)

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
  console.log('---stage after ', newStage)

  //console.log('NEW STAGE ', newStage)
  return newStage;
};











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
            //console.log(objPlayerAfterGame.stage)
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
           // console.log('RESPONSE: ', game.room)

            let piece = startGame(game, rooms)
            io.sockets.in(game.room).emit('pieceStart', piece);
            let obj = objPlayer(userlist, socket.id)
            let objGame = objGaming(rooms, obj.roomAssociate)
            objGame.setNextPiece()
            //obj.setCollidedFalse()
            io.sockets.in(game.room).emit('stage', {
                'newStage': updateStage(piece, obj, 1),
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
              //obj.setCollidedFalse()
              io.to(`${socket.id}`).emit('stage', {
                  'newStage': newStage,
                  'collided': false
  
              });
            }
            else{
              //let newStage = updatePlayerPos(obj.pos.x, 0, obj, objGame)
              let newStage = updatePlayerPose(0, 0, obj, objGame)
              //obj.setCollidedTrue()
              io.to(`${socket.id}`).emit('stage', {
                'newStage': newStage,
                'collided': true

            });

            }
          

        })

        socket.on('dropTetro', pos => {       
          let obj = objPlayer(userlist, socket.id)
          let objGame = objGaming(rooms, obj.roomAssociate)
          //obj.setCollidedFalse()

        //console.log('1 -> ', obj.stage)
          let ok = checkCollision(objGame.piece, obj, { x: 0, y: 1 })

          console.log('result ok ', ok)
          if (!ok)
          {
            console.log('++++++++++++++++++++++++++++++++++++')
          if (objGame.userPiece && objGame.userPiece.length)
          {
            //objGame.setUserPieceNull()
          }
            let newStage = updatePlayerPosDown(0, 1, obj, objGame)
            //obj.setCollidedFalse()
            obj.setStage(newStage)
            
            io.to(`${socket.id}`).emit('stage', {
                'newStage': obj.stage,
                'collided': false

            });
          }
          else{
            //let newStage = updatePlayerPos(obj.pos.x, 0, obj, objGame)
            //obj.setCollidedTrue()
            //if (objGame.userPiece && objGame.userPiece.length)
            //{
         
            //}
          

            let newStage = updateStaging(objGame.piece, obj)
            objGame.setPiece()
            objGame.setNextPiece()

            objGame.setUserPieceNull()
            objGame.setUserPiece(obj.login)
            let nouv = updateStaging2(objGame.piece, obj)
            obj.setStage(nouv)

            //console.log('===========================----------> ', obj.stage)
          
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