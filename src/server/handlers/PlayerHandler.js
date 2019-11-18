import Player from '../models/Player';

/* Create a new Player model and add it to userList */

export const playerLogin = (socketId, playerName, userList) => {
    let player = new Player(socketId, playerName);
    player.setStage();
    userList.push(player);
    return ;
}

// export const loginUser = (socket, infoUser, userList) => {
//     let log = {
//         login: null
//     }

//     console.log(socket);
    
//     let newPlayer = new Player(socket.id, infoUser.username)
//     newPlayer.setStage();
//     userList.push(newPlayer)
//     log.login = infoUser.username
//     return log
// }
