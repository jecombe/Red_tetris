import Player from '../models/Player';

/* Create a new Player model and add it to userList */


 export const loginUser = (socket, infoUser, userList) => {

    let newPlayer = new Player(socket.id, infoUser.username)
    newPlayer.setStage();
    userList.push(newPlayer)
 }
