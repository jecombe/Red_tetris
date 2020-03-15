import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import { BlockLoading } from 'react-loadingg';
import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import Stage from './Stage';
import GameStatus from './GameStatus';
import {
  flushUpdate, updateRows, updateStage, checkCollision,
} from '../../../shared/stage';
import { useInterval } from '../../helpers/gameHelpers';

const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const GameBoard = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
    playerOwner,
    playerGameOver,
    playerDropTime,
    reqStartGame,
    position,
    piece,
    updatePosition,
    updateCollision,
    collided,
    playerWin,
    move,
  } = props;

  /** *****      TIMER DROP  ************ */
  useInterval(() => {
    if (playerGameOver === false && playerWin === false) move({ keyCode: 40 });
  }, playerDropTime);
  /** *****      TIMER DROP  ************ */
  // const [t, setT] = useState(0);

  const handleSubmitStatus = () => {
    // setT(1)
    reqStartGame({ playerName, playerRoom });
  };

  //* ********** FONCTION POUR AFFICHER LES PIECES SELON LES COLLISONS *************************/
  // const printTetroStage = () => {
  //   if (piece && !collided) {
  //     //* ********** AJOUTE LE OU LES PIECES SUR LA STAGE *************************/
  //     updateStage(piece, playerStage, position.x, position.y, collided);
  //   } else if (collided) {
  //     //* ********** AJOUTE LA PROCHAINE PIECES SUR LA STAGE LORSQU'IL Y A COLLISION *************************/
  //     const { stage, lineFull } = updateRows(updateStage(piece, playerStage, position.x, position.y, true));
  //     updateCollision({
  //       playerStage: stage, playerRoom, x: 10 / 2 - 2, y: 0, lineFull, playerGameOver,
  //     });
  //   }
  // };// <BouncyDiv><h1 style={mystyle}>GAME OVER</h1></BouncyDiv>

  // printTetroStage();

  // if (playerWin === true) {
  //   return (
  //     <>
  //       <BouncyDiv>
  //         <h1 style={winner}>WINNER</h1>
  //       </BouncyDiv>

  //       <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
  //         {playerOwner ? (
  //           <GameStatus handleSubmit={handleSubmitStatus} />
  //         ) : <h1>YOU ARE NOT THE OWNER</h1>}
  //       </Grid>

  //     </>

  //   );
  // }
  // if (playerGameOver === true) {
  //   return (
  //     <>
  //       <BouncyDiv>
  //         <h1 style={gameOver}>LOSER</h1>
  //       </BouncyDiv>

  //       <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
  //         {playerOwner ? (
  //           <GameStatus handleSubmit={handleSubmitStatus} />
  //         ) : <h1>YOU ARE NOT THE OWNER</h1>}
  //       </Grid>
  //     </>
  //   );
  // }

  return (
    <Grid container justify="center" onKeyDown={(e) => move(e)} tabIndex="0">
      {playerStage && playerStage.length ? (
        <Grid item xs={6} lg={9} container justify="center" alignItems="center">
          <Stage tabIndex="0" stage={playerStage} />
        </Grid>
      ) : <BlockLoading />}
      {playerNextPiece && playerNextPiece.length ? (
        <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
          <Stage stage={playerNextPiece} />
          {playerOwner ? (
            <GameStatus handleSubmit={handleSubmitStatus} />
          ) : <h1>YOU ARE NOT THE OWNER</h1>}
        </Grid>
      ) : <BlockLoading />}
    </Grid>
  );
};

GameBoard.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerOwner: PropTypes.bool.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
};

const gameOver = {
  position: 'absolute',
  textTransform: 'uppercase',
  fontFamily: 'verdana',
  fontSize: '12em',
  fontWeight: '700',
  color: '#E50003',
  textShadow: '1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)',

};

const winner = {
  position: 'absolute',
  textTransform: 'uppercase',
  fontFamily: 'verdana',
  fontSize: '12em',
  fontWeight: '700',
  color: '#32E306',
  textShadow: '1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)',
};

export default GameBoard;
