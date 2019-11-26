import Room from './Room'
import Piece from './Piece'

export default class Game extends Room {
    constructor(nameGame) {
        super(nameGame)
        this.gameStart = false,
        this.piece = null,
        this.nextPiece = null
        this.userPiece = []
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
        this.piece = new Piece()
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
        
        /*const found = this.userPiece.find(element => element === username);
    
        console.log('FOUND ', found)
        if (found === undefined)
        {
            console.log(' undefined ')
            this.userPiece.push(username)
    
        }
        else{
            console.log('non undefined')
    
        }*/
        console.log('===================================> ', this.userPiece)
        if (this.userPiece && this.userPiece.length) {
            //console.log('plain ')
            this.userPiece = []

        }
        else
        {
            //console.log('vide ')
            this.userPiece.push(username)
            this.piece = this.nextPiece
            this.nextPiece = new Piece()


        }
    
        }

        setUserPieceNull(){
            this.userPiece = []
        }
}