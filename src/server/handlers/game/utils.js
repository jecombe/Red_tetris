
export const searchRoomInUser = (userList, login) => {
  let room;
  userList.find((obj) => {
    if (obj.login == login) {
      room = obj.roomAssociate;
      return room;
    }
  });
  return room;
};

export const searchGameRoom = (rooms, room) => {
  let objGame;
  rooms.find((obj) => {
    if (obj.roomName == room) {
      objGame = obj;
      return objGame;
    }
  });
  return objGame;
};
export const searchObjPlayer = (owner, userlist) => {
  let objPlayer;
  userlist.find((obj) => {
    if (obj.login == owner) {
      objPlayer = obj;
      return objPlayer;
    }
  });
  return objPlayer;
};

export const calcIndexRoom = (onlineGame, roomName) => {
  const index = onlineGame.findIndex((info) => info.roomName === roomName);
  return index;
};
