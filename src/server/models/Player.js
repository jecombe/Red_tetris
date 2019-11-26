import {createStage} from '../stage'

export default class Player {
    constructor(socketId, username) {
        this.login = username,
        this.idSocket = socketId,
        this.owner = false,
        this.stage = null,
        this.losing = false,
        this.roomAssociate = null,
        this.pos = { x: 0, y: 0 }
        this.collided = false

    }

    getLogin(){
        return this.login
    }
    getIdSocket(){
        return this.idSocket
    }

    getroomAssociate(){
        return this.roomAssociate
    }
    isOwner(){
        return this.owner
    }

    setLogin(login){
        this.login = login

    }
    setOwner(){
        this.owner = true
    }

    setStage(stage){
        this.stage = stage;
    }

    setPosition(x, y){
        this.pos.x = x + this.pos.x
        this.pos.y = y + this.pos.y
    }
    setPositionNull(){

        this.pos = { x: 0, y: 0 }
    }

    setCollidedTrue(){
        this.collided = true
    }

    setCollidedFalse(){
        this.collided = false
    }

}