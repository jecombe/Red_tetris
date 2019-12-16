import Player from '../../models/Player';
import { createStage } from '../../helpers/stage';

/* Create a new Player model and add it to userList */

const loginUser = (socket, username, userList) => {
  const newPlayer = new Player(socket.id, username);
  newPlayer.setStage(createStage());
  userList.push(newPlayer);
  return newPlayer;
};

export default loginUser;
