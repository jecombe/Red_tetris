import Room from './Room'

export default class Game extends Room {
    constructor(nameGame) {
        super(nameGame)
        this.gameStart = false,
        this.piece = null
    }

    getgameName(){
        return this.roomName
    }

    setPlayerOwner(owner){
        this.owner = owner
    }

    setUser(user){
        this.users.push(user)
    }

    setGameStart(){
        this.gameStart = true
    }

}