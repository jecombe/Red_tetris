import { deleteUserInGame, freeGame } from './game/deleteGame';
import { switchOwnerToPlayer, freeUserList } from './player/deletePlayer';


const calcIndex = (userList, data) => {
    let index = userList.findIndex(info => info.login === data);
    return index
}

const isEmpty = onlineGame => {

    let empty = 'no'

    onlineGame.find(obj => {

        if (obj.users && obj.users.length) {
            empty = 'no'
            return empty
        }
        else {
            empty = 'yes'
            return empty
        }
    })
    return empty


}

/*Free user in game*/
export const shareAction = (login, roomActual ,onlineGame, userList) => {

    /*Calcule index of Player in userList*/
    let index = calcIndex(userList, login)
    /*Search login of new owner*/
    let loginNewOwner = deleteUserInGame(onlineGame, login, userList, roomActual)
    /*Switch owner false to true for new owner*/
    switchOwnerToPlayer(userList, roomActual, loginNewOwner)
    /*Free old user in userList*/
    freeUserList(userList, index)
    /*Check if there are users in current game, if there is no user, we can delete game actual*/
    let empty = isEmpty(onlineGame, roomActual)
    if (empty === 'yes') {
        /*free game*/
        freeGame(onlineGame, roomActual)
    }
}
