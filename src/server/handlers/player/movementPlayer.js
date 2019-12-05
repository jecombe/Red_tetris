import { checkCollision } from '../../../client/helpers/gameHelpers';

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
  
  
  function is_full(currentValue)
  {
    return (currentValue[1] === 'merged');
  
  }
  const updateRows = (newStage) => {
  
    //Pour la hauteur verifie si une ligne est pleine
      newStage.forEach((row) => {
  
        let full_line = row.every(is_full)
        if (full_line === true)
        {
          //Check l'index de la ligne pleine;
          let index = newStage.indexOf(row);
          //Met la ligne a 0
          row.fill([0, 'clear']);
          //Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
          newStage.splice(index, 1);
          //Ajoute au debut du tableau un nouveau tableau de 10 a 0
          newStage.unshift(new Array(10).fill([0, 'clear']));
        }
  
      });
  
      return (newStage)
    }
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
      objPlayer.setStage(updateRows(objPlayer.stage))
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
    let checkColl = false
  
    while (checkCollision(clonedPlayer.piece, objPlayer, { x: 0, y: 0 })){
         clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
     if (offset > clonedPlayer.piece.form.shape[0].length) {
        console.log('2222222222222')
        rotate(clonedPlayer.piece.form.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    objPlayer.setPositionNull()
    objPlayer.setPiece(clonedPlayer.piece)
    objPlayer.setPosition(clonedPlayer.pos.x, clonedPlayer.pos.y)
    objPlayer.setStage(updateStagingRotate(objPlayer.piece, objPlayer))
  }
  
  
  const moveTetroDown = (objPlayer, objGame) => {
  
    let i = 0;
    let checkColl = false
    while (checkColl != true) {
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

export const movementPlayer = (keyCode, objGame, objUser) => {
    if (keyCode === 32) {
        moveTetroDown(objUser, objGame)
    }
    else if (keyCode === 37) {
        console.log('LEFT');
        moveTetro(-1, objUser, objGame)
    } else if (keyCode === 38) {
        playerRotate(objUser, 1)
        console.log('HAUT');
    } else if (keyCode === 39) {
        console.log('RIGTH');
        moveTetro(1, objUser, objGame)
    } else if (keyCode === 40) {
        dropTetro(objUser, objGame)
        console.log('BAS');
    }
}