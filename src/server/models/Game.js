import Room from './Room'
import Piece from './Piece'
import { threadId } from 'worker_threads'

export default class Game extends Room {
    constructor(nameGame) {
        super(nameGame)
        this.gameStart = false,
        this.piece = null,
        this.nextPiece = null
        this.userPiece = []
        this.tetro = []
    }

    getgameName(){
        return this.roomName
    }

    getOwnerGame()
    {
        return this.owner
    }

    setPlayerOwner(owner){
        this.owner = owner
    }

    setUser(user){
        this.users.push(user)
    }

    setGameStart(){
        this.gameStart = true
        //this.piece = new Piece()
        this.tetro.push(new Piece)
        this.tetro.push(new Piece)
        //this.setTetro(new Piece())

    }

    setPiece(){
        this.piece = this.nextPiece
    }

    setNextPiece(){
        this.nextPiece = new Piece()
    }
    
    setDestroyPiece(){
        this.piece = null
    }

    setUserPiece(username){

        this.userPiece = username
    }

    setTetro(){
        this.tetro.push(new Piece())
    }
    setTetroNull(){
        this.tetro = []
    }

        setUserPieceNull(){
            this.userPiece = []
        }
}