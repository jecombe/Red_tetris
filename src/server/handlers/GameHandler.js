import Game from '../models/Game';

const create = (roomName, username, userList) => {

    let game = new Game(roomName)
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

export const searchUserInList = (idSocket, userList) => {
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

export const searchRoomInUser = (userList, login) => {
    let room
    userList.find(obj => {
        if (obj.login == login) {
            room = obj.roomAssociate
            return room;
        }
    })
    return room;
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

const deleteUserInGame = (onlineGame, login, userList, roomActual) => {

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

/*Free user in game*/
export const freeUserInGame = (login, roomActual ,onlineGame, userList) => {

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













const searchGameRoom = (rooms, room) => {
    let objGame
    rooms.find(obj => {
        if (obj.roomName == room) {
            objGame = obj
            return objGame
        }
    })
    return objGame

}

/*Start game (TO DO)*/
export const startGame = (game, rooms) => {

    let user = game.username
    let room = game.room
    /*Return object Game, check with name of room*/
    let objGame = searchGameRoom(rooms, room)
    /*Start Game, game start true and random piece*/
    objGame.setGameStart()
    console.log('obj game', objGame)

}