export default class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.users = [];
    this.owner = null;
  }

  setUser(user) {
    this.users.push(user);
  }

}
