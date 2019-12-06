/* --- siwtch owner actual to another player in game --- */
export const switchOwnerToPlayer = (userList, roomActual, loginNewOwner) => {
  userList.find((obj) => {
    if (obj.login == loginNewOwner) {
      if (obj.roomAssociate == roomActual) {
        obj.owner = true;
      }
    }
  });
};

/* --- delete user in list --- */
export const freeUserList = (userList, index) => {
  userList.splice(index, 1);
};
