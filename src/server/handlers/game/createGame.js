import Game from '../../models/Game';


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

const findGame = (onlineGame, roomActual) => {

    let gameExiste = 'toCreate';

    if (!onlineGame.length) {
        gameExiste = 'toCreate';
    }
    onlineGame.find(obj => {
        if (obj.roomName == roomActual) {
            gameExiste = 'toJoin';
        }
    });
    return gameExiste
}

const addPlayerInGame = (onlineGame, username, roomActual) => {
    let objGame
    onlineGame.find(obj => {
        if (obj.roomName == roomActual) {
            obj.users.push(username)
            objGame = obj
            return objGame;
        }
    })
    return objGame;
}

const addGameInPlayer = (userList, username, roomName) => {
    let objPlayer;
    userList.find(obj => {
        if (obj.login == username) {
            obj.roomAssociate = roomName
            objPlayer = obj
            return objPlayer
        }
    })
    return objPlayer
}


export const createGame = (onlineGame, userList, username, roomActual) => {


    let existeGame = findGame(onlineGame, roomActual)

    if (existeGame === 'toCreate') {
        let createGame = create(roomActual, username, userList)
        onlineGame.push(createGame);

    }
    let objGame = addPlayerInGame(onlineGame, username, roomActual)
   let objPlayer = addGameInPlayer(userList, username, roomActual)

    return [objGame, objPlayer]
}