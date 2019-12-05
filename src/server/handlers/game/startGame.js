
import { searchGameRoom, searchObjPlayer } from './utils';

export const startGaming = (game, rooms, userlist) => {

    /*Return object Game, check with name of room*/
       let objGame = searchGameRoom(rooms, game.room)
       let objPlayer = searchObjPlayer(game.username,userlist)
       /*Start Game, game start true and random piece*/
       objGame.setTetroNull()
       objGame.setGameStart()
       //console.log('obj game', objGame)
       return [objPlayer, objGame]
       //return objGame.piece
   
   }