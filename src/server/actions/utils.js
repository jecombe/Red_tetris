export const objPlayer = (userList, id) => {
    let objPlayer;
    userList.find(obj => {
      if (obj.idSocket == id) {
        objPlayer = obj
        return objPlayer
      }
    })
    return objPlayer
  }
  
  
  export const objGaming = (onlineGame, roomActual) => {
    let objGame
    onlineGame.find(obj => {
      if (obj.roomName == roomActual) {
        objGame = obj
        return objGame;
      }
    })
    return objGame;
  }
  


export const objUser = (userList, id) => {
    let objPlayer;
    userList.find(obj => {
      if (obj.login == id) {
        objPlayer = obj
        return objPlayer
      }
    })
    return objPlayer
  }