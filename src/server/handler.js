import Player from './models/Player'
import Game from './models/Game'

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

const create = (roomName, username, userList) => {

    let game = new Game()
    game.setGameName(roomName)
    game.setPlayerOwner(username)

    userList.find(obj => {
        if (obj.login == username) {
            obj.owner = true
        }
    })
    return game

}

const findGame = (onlineGame, game) => {

    let gameExiste = 'toCreate';

    if (!onlineGame.length) {
        gameExiste = 'toCreate';
    }
    onlineGame.find(obj => {
        if (obj.roomName == game.gameName) {
            gameExiste = 'toJoin';
        }
    });
    return gameExiste

}

const addPlayerInGame = (onlineGame, game) => {
    onlineGame.find(obj => {
        if (obj.roomName == game.gameName) {
            obj.users.push(game.username)

        }
    })
}

const addGameInPlayer = (userList, username, roomName) => {
    userList.find(obj => {
        if (obj.login == username) {
            obj.roomAssociate = roomName
        }
    })
}

export const createGame = (game, onlineGame, userList, socket) => {

    let existeGame = findGame(onlineGame, game)

    if (existeGame === 'toCreate') {
        let createGame = create(game.gameName, game.username, userList)
        onlineGame.push(createGame);
    }
    addPlayerInGame(onlineGame, game)
    addGameInPlayer(userList, game.username, game.gameName)
    return existeGame
}


const calcIndex = (userList, data) => {

    let index = userList.findIndex(info => info.login === data);
    return index

}
const searchUserInList = (idSocket, userList) => {
    let login

    userList.find(obj => {
        if (obj.idSocket == idSocket) {
            login = obj.login
            return login
        }
    })
    return login

}

const freeUserList = (userList, index) => {

    userList.splice(index, 1)
}

const searchRoomInUser = (userList, login) => {
    let room
    userList.find(obj => {
        if (obj.login == login) {
            room = obj.roomAssociate
            return room;
        }
    })
    return room;

}

const deleteUserInGame = (onlineGame, login, roomActual) => {

    let loginNewOwner = ''

    onlineGame.find(obj => {
        if (obj.roomName == roomActual) {
            const index = obj.users.indexOf(login);
            if (index !== -1) {
                obj.users.splice(index, 1);
                obj.playerOwner = obj.users[0]
                loginNewOwner = obj.playerOwner
                return loginNewOwner
            }
        }
    })
    return loginNewOwner

}
const switchOwnerToPlayer = (userList, roomActual, loginNewOwner) => {

    userList.find(obj => {
        if (obj.login == loginNewOwner) {
            if (obj.roomAssociate == roomActual) {
                obj.owner = true
            }
        }
    })

}

const calcIndexRoom = (onlineGame, roomName) => {

    let index = onlineGame.findIndex(info => info.roomName === roomName);
    return index
}

const isEmpty = onlineGame => {

    let empty = 'no'

    onlineGame.find(obj => {
        console.log('obj ', obj.users)

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

const freeGame = (onlineGame, roomActual) => {

    let indexGame = calcIndexRoom(onlineGame, roomActual)
    onlineGame.splice(indexGame, 1)


}
export const freeUserInGame = (idSocket, onlineGame, userList) => {

    let login = searchUserInList(idSocket, userList)
    let index = calcIndex(userList, login)
    let roomActual = searchRoomInUser(userList, login)
    let loginNewOwner = deleteUserInGame(onlineGame, login, userList, roomActual)
    switchOwnerToPlayer(userList, roomActual, loginNewOwner)
    freeUserList(userList, index)
    let empty = isEmpty(onlineGame, roomActual)
    if (empty === 'yes') {
        freeGame(onlineGame, roomActual)
    }
}

export const startGame = (game) => {

}

