export const is_full = (currentValue) => (currentValue[1] === 'merged');

export const updateStage = (piece, newStage, obj) => {
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
  
  export const userInGameExceptActual = (userTab, userActual) => {
    const index = userTab.indexOf(userActual);
    const copie = new Array();
    for (let i = 0; i < userTab.length; i++) {
      copie[i] = userTab[i];
    }
    copie.splice(index, 1);
    return copie;
  };