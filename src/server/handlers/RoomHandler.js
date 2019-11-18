import Room from '../models/Room';

export const roomJoin = (roomName, playerName, rooms) => {
    let room = rooms.find(x => x.name === roomName);

    /* If room is not find, create a new one with playerName as owner */
    if (room === undefined) {
        console.log("This room doesn't exist");
        room = new Room(roomName, playerName);
        rooms.push(room);
    }

    /* Add the player in the users in room */
    room.users.push(playerName);
    return ;
}
