import Room from './Room'

export default class Game extends Room {
    constructor() {
        super()
        this.playerOwner = null,
        this.gameStart = false,
        this.piece = null
    }

    getgameName(){
        return this.roomName
    }
    
    setGameName(name){
        this.roomName = name

    }

    setPlayerOwner(owner){
        this.playerOwner = owner
    }

    setUser(user){
        this.users.push(user)
    }

    setGameStart(){
        this.gameStart = true
    }

}