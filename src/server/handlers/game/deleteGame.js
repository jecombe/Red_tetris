import { calcIndexRoom } from './utils';

export const deleteUserInGame = (onlineGame, login, userList, roomActual) => {

    let loginNewOwner = ''

    onlineGame.find(obj => {
        if (obj.roomName == roomActual) {
            const index = obj.users.indexOf(login);
            if (index !== -1) {
                obj.users.splice(index, 1);
                obj.owner = obj.users[0]
                loginNewOwner = obj.owner
                return loginNewOwner
            }
        }
    })
    return loginNewOwner

}

export const freeGame = (onlineGame, roomActual) => {
    let indexGame = calcIndexRoom(onlineGame, roomActual)
    onlineGame.splice(indexGame, 1)
}
