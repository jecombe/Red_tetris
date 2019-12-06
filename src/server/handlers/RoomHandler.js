/* import Room from '../models/Room';

export const roomJoin = (roomName, playerName, rooms) => {
    let room = rooms.find(x => x.name === roomName);


    if (room === undefined) {
        console.log("This room doesn't exist");
        room = new Room(roomName, playerName);
        rooms.push(room);
    }


    room.users.push(playerName);
    return ;
}
*/
