export const searchUserInList = (idSocket, userList) => {
  let login;
  userList.find((obj) => {
    if (obj.idSocket == idSocket) {
      login = obj.login;
      return login;
    }
  });
  return login;
};

export const is_full = (currentValue) => (currentValue[1] === 'merged');
