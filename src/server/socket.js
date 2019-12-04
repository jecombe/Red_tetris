import { loginUser, playerLogin } from './handlers/PlayerHandler';
import { roomJoin } from './handlers/RoomHandler';
import { createGame, freeUserInGame, startGame, searchUserInList, searchRoomInUser } from './handlers/GameHandler';
import { createStage } from './stage';
import { checkCollision, checkCollision1 } from '../client/helpers/gameHelpers';


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


  let newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
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


const objUser = (userList, id) => {
  let objPlayer;
  userList.find(obj => {
    if (obj.login == id) {
      objPlayer = obj
      return objPlayer
    }
  })
  return objPlayer
}

const searchAllUser = (game, userlist, piece) => {
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

  for (var i = 0; i < game.users.length; i++) {
    let obj = objUser(userlist, game.users[i])
    obj.setPlayerNull();
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






const updatePlayerPosition = (x, y, obj) => {


  obj.setPosition(x, y)

  const newStage = updateStagee(obj.piece, obj)
  return newStage

};

const updateStagee = (piece, obj) => {


  let newStage


  newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

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


const updatePlayerPosDown = (x, y, obj, objGame) => {



  obj.setPosition(x, y)

  const newStage = update(obj.piece, obj, objGame)
  return newStage


};

const updateStagingBeforeCollision = (piece, obj) => {


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


const updateStagingAfterCollision = (piece, obj) => {


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


const updateStageee = (piece, obj) => {

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
  return newStage;
};

const updatePlayerPositionCollision = (x, y, obj, objGame) => {

  obj.setPosition(x, y)

  const newStage = updateStageee(obj.piece, obj, 0)
  return newStage

};


const moveTetro = (position, objUser, objGame) => {

  if (!checkCollision(objUser.piece, objUser, { x: position, y: 0 }))
    objUser.setStage(updatePlayerPosition(position, 0, objUser, objGame))
  else
    objUser.setStage(updatePlayerPositionCollision(0, 0, objUser, objGame))

}

const dropTetro = (objPlayer, objGame) => {


  if (!checkCollision(objPlayer.piece, objPlayer, { x: 0, y: 1 })) {
    objPlayer.setStage(updatePlayerPosDown(0, 1, objPlayer, objGame))
  }
  else {
    objPlayer.setIndex(objPlayer.index + 1)
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer))
    objPlayer.setPiece(objGame.tetro[objPlayer.index])
    if (!objGame.tetro[objPlayer.index + 1]) 
      objGame.setTetro()
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer))
  }
}


const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};


const updateStagingRotate = (piece, obj) => {



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

const playerRotate = (objPlayer, dir) => {

  const clonedPlayer = JSON.parse(JSON.stringify(objPlayer));
  clonedPlayer.piece.form.shape = rotate(clonedPlayer.piece.form.shape, dir);
  const pos = objPlayer.pos.x;
  let offset = 1;

while (checkCollision(clonedPlayer.piece, objPlayer, { x: 0, y: 0 })) {
    clonedPlayer.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > clonedPlayer.piece[0].length) {
      rotate(clonedPlayer.piece, -dir);
      clonedPlayer.pos.x = pos;
      return;
    }
  }
  objPlayer.setPiece(clonedPlayer.piece)
  objPlayer.setPositionNull()
  objPlayer.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y)
  objPlayer.setStage(updateStagingRotate(objPlayer.piece, objPlayer))


}


const moveTetroDown = (objPlayer, objGame) => {

  let i = 0;
  let checkColl = false
while (checkColl != true){
    i = i + 1
   checkColl = checkCollision(objPlayer.piece, objPlayer, { x: 0, y: i })
   checkColl = checkCollision(objPlayer.piece, objPlayer, { x: 0, y: i + 1 })
}
objPlayer.setStage(updatePlayerPosDown(0, i, objPlayer, objGame))
objPlayer.setIndex(objPlayer.index + 1)
    objPlayer.setStage(updateStagingBeforeCollision(objPlayer.piece, objPlayer))
    objPlayer.setPiece(objGame.tetro[objPlayer.index])
    if (!objGame.tetro[objPlayer.index + 1]) 
      objGame.setTetro()
    objPlayer.setStage(updateStagingAfterCollision(objPlayer.piece, objPlayer))



}
const socketHandler = (io, userlist, rooms) => {

  io.on('connection', socket => {
    io.emit('appGetRooms', {
      'rooms': rooms
    });

    socket.on('LoginUserGame', game => {

      let objPlayerBeforeGame = loginUser(socket, game.username, userlist)
      const [objGame, objPlayerAfterGame] = createGame(rooms, userlist, game.username, game.roomActual)

      io.emit('appGetRooms', {
        'rooms': rooms
      });

      /*Join room*/
      socket.join(game.roomActual)

      /*A definir*/
      io.to(`${socket.id}`).emit('objPlayer', {
        'stage': objPlayerAfterGame.stage,

      });
      io.sockets.emit('joined', {
        'success': true,
        'rooms': rooms
      });
    })

    socket.on('startGame', game => {

      const [objPlayer, objGame] = startGame(game, rooms, userlist)

      io.sockets.in(game.room).emit('stage', {
        'newStage': updateStage(objGame.tetro[0], objGame, userlist),
      });
    })

    socket.on('PositionTetro', keyCode => {

      let objUser = objPlayer(userlist, socket.id)
      let objGame = objGaming(rooms, objUser.roomAssociate)
      if (keyCode.keyCode === 32) {
        moveTetroDown(objUser, objGame)
      }
      else if (keyCode.keyCode === 37) {
        console.log('LEFT');
        moveTetro(-1, objUser, objGame)
      } else if (keyCode.keyCode === 38) {
        playerRotate(objUser, 1)
        console.log('HAUT');
      } else if (keyCode.keyCode === 39) {
        console.log('RIGTH');
        moveTetro(1, objUser, objGame)
      } else if (keyCode.keyCode === 40) {
        dropTetro(objUser, objGame)
        console.log('BAS');
      }
      io.to(`${socket.id}`).emit('stage', {
        'newStage': objUser.stage,
      });
    })

    socket.on('disconnect', () => {
      /*Search user login in userList*/
      let login = searchUserInList(socket.id, userlist)
      /*Search room name of player*/
      let roomActual = searchRoomInUser(userlist, login)
      socket.leave(roomActual)
      freeUserInGame(login, roomActual, rooms, userlist)
    });
  });
}

module.exports = socketHandler;