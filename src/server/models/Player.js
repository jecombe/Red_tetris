import {createStage} from '../stage'

export default class Player {
    constructor(socketId, username) {
        this.login = username,
        this.idSocket = socketId,
        this.owner = false,
        this.stage = null,
        this.losing = false
        this.roomAssociate = null
    }

    getLogin(){
        return this.login
    }
    getIdSocket(){
        return this.idSocket
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

    setStage(){
        this.stage = createStage();
    }

}