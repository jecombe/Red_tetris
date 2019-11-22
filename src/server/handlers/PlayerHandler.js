import Player from '../models/Player';

/* Create a new Player model and add it to userList */


 export const loginUser = (socket, username, userList) => {

    let newPlayer = new Player(socket.id, username)
    newPlayer.setStage();
    userList.push(newPlayer)
    return newPlayer
 }
