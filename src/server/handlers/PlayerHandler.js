import Player from '../models/Player';

export const loginUser = (socket, infoUser, userList, roomList) => {
    let log = {
        login: null
    }

    let newPlayer = new Player(socket.id, infoUser.username)
    newPlayer.setStage();
    userList.push(newPlayer)
    log.login = infoUser.username
    return log
}
