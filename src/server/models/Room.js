export default class Room {
    constructor(roomName, playerName){
        this.name = roomName,
        this.owner = playerName,
        this.users = []
    }
}
