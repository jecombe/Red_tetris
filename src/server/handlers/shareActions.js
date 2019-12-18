import { deleteUserInGame, freeGame } from './game/deleteGame';
import { switchOwnerToPlayer, freeUserList } from './player/deletePlayer';


const calcIndex = (userList, data) => {
  const index = userList.findIndex((info) => info.login === data);
  return index;
};

const isEmpty = (onlineGame) => {
  let empty = 'no';

  onlineGame.find((obj) => {
    if (obj.users && obj.users.length) {
      empty = 'no';
      return empty;
    }
    empty = 'yes';
    return empty;
  });
  return empty;
};

/* Free user in game */
// eslint-disable-next-line import/prefer-default-export
export const shareAction = (login, roomActual, onlineGame, userList) => {
  /* Calcule index of Player in userList */
  const index = calcIndex(userList, login);
  /* Search login of new owner */
  const loginNewOwner = deleteUserInGame(onlineGame, login, userList, roomActual);
  /* Switch owner false to true for new owner */
  switchOwnerToPlayer(userList, roomActual, loginNewOwner);
  /* Free old user in userList */
  freeUserList(userList, index);
  /* Check if there are users in current game, if there is no user, we can delete game actual */
  const empty = isEmpty(onlineGame, roomActual);
  if (empty === 'yes') {
    /* free game */
    freeGame(onlineGame, roomActual);
  }
};
