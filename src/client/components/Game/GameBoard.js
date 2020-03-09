import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Stage from './Stage';
import GameStatus from './GameStatus';
import { flushUpdate, updateRows, updateStage, checkCollision } from '../../../shared/stage';

import { BlockLoading } from 'react-loadingg';

import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}

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

  } = props;

  const dropTetro = () => {
    if (!checkCollision(piece, playerStage, { x: 0, y: 1 }, position.x, position.y)) {

      let newX = position.x + 0;
      let newY = position.y + 1;

      updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece: piece, collided: false, playerGameOver: playerGameOver })

    }
    else {
      let playerGameOver = false
      if (position.y < 1) {
        playerGameOver = true;
      }
      updatePosition({ x: position.x, y: position.y, playerStage: flushUpdate(piece, playerStage, position.x, position.y, false), piece: piece, collided: true, playerGameOver: playerGameOver })
    }
  }


  const moveTetro = (dir) => {
    if (!checkCollision(piece, playerStage, { x: dir, y: 0 }, position.x, position.y)) {
      let newX = position.x + dir;
      let newY = position.y + 0;
      updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece: piece, collided: false, playerGameOver: playerGameOver })
    } else {
      let newX = position.x + 0;
      let newY = position.y + 0;
      updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece: piece, collided: false, playerGameOver: playerGameOver })

    }
  }

  const moveTetroUp = (dir) => {


    const clonedPiece = JSON.parse(JSON.stringify(piece));
    clonedPiece.form.shape = rotate(clonedPiece.form.shape, dir);
    const pos = position.x;
    let pos2 = position.x;
    let offset = 1;
    while (checkCollision(clonedPiece, playerStage, { x: 0, y: 0 }, position.x, position.y)) {
      pos2 += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPiece.form.shape[0].length) {
        rotate(clonedPiece.form.shape, -dir);
        pos2 = pos;
        return;
      }
    }
    updatePosition({ x: pos2, y: position.y, playerStage: flushUpdate(clonedPiece, playerStage, pos2, position.y, false), piece: clonedPiece, playerGameOver: playerGameOver })
  }

  const moveDownTetro = () => {
    let i = 0;
    let checkColl = false;
    while (checkColl !== true) {
      i += 1;
      checkColl = checkCollision(piece, playerStage, { x: 0, y: i }, position.x, position.y)
      if (checkColl === true) {
        /* --- Check Game Over --- */
        /* if (this.pos.y < 1) {
           console.log('GAME OVER');
           this.setLosing(true);
           if (!this.peopleSpectre.length) {
             this.setNoLosing2();
           }
         }*/
        i -= 1;
        break;
      }
      checkColl = checkCollision(piece, playerStage, { x: 0, y: i + 1 }, position.x, position.y)
    }
    let newX = position.x + 0;
    let newY = position.y + i;
    updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece: piece, collided: true })

  };

  const move = ({ keyCode }) => {

    //if (playerGameOver === false) {
    if (keyCode === 40) {
      dropTetro()
    }
    else if (keyCode === 37) {
      moveTetro(-1);
    }
    else if (keyCode === 39) {
      moveTetro(1);
    }
    else if (keyCode === 38) {
      moveTetroUp(1);
    }
    else if (keyCode === 32) {
      moveDownTetro();
    }
    //}
  };

  /*******      TIMER DROP  *************/
  /*useInterval(() => {
    if (otherNotLosing > -1) {
      const keyCode = 40;
      reqSendPosition({ keyCode, playerRoom });
    }
  }, playerDropTime);
  /*******      TIMER DROP  *************/

  const handleSubmitStatus = () => {
    reqStartGame({ playerName, playerRoom });
  }

  //*********** FONCTION POUR AFFICHER LES PIECES SELON LES COLLISONS *************************/
  const printTetroStage = () => {
    if (piece && !collided) {

      //*********** AJOUTE LE OU LES PIECES SUR LA STAGE *************************/
      updateStage(piece, playerStage, position.x, position.y, collided)
    }
    else if (collided) {
      //*********** AJOUTE LA PROCHAINE PIECES SUR LA STAGE LORSQU'IL Y A COLLISION *************************/
      const { stage, lineFull } = updateRows(updateStage(piece, playerStage, position.x, position.y, true))
      updateCollision({ playerStage: stage, playerRoom: playerRoom, x: 10 / 2 - 2, y: 0, lineFull: lineFull, playerGameOver: playerGameOver })
    }
  }// <BouncyDiv><h1 style={mystyle}>GAME OVER</h1></BouncyDiv>

  printTetroStage();

  if (playerWin === true) {
    return (
      <>
        <BouncyDiv>
          <h1 style={mystyle2}>WINNER</h1>
        </BouncyDiv>

        <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
          {playerOwner ? (
            <GameStatus handleSubmit={handleSubmitStatus} />
          ) : <h1>YOU ARE NOT THE OWNER</h1>}
        </Grid>

      </>

    )
  }
  else if (playerGameOver === true) {
    return (
      <>
        <BouncyDiv>
          <h1 style={mystyle}>LOOSER</h1>
        </BouncyDiv>

        <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
          {playerOwner ? (
            <GameStatus handleSubmit={handleSubmitStatus} />
          ) : <h1>YOU ARE NOT THE OWNER</h1>}
        </Grid>
      </>
    )
  }
  else {
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
      </Grid>)
  }
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

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
  playerOwner: state.player.playerOwner,
  playerGameOver: state.player.playerGameOver,
  playerDropTime: state.player.playerDropTime,
  position: state.player.position,
  collided: state.player.collided,
  piece: state.player.piece,
  playerWin: state.player.playerWin,



});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqSendPosition: actions.reqSendPosition,
  updatePosition: actions.updatePosition,
  updateCollision: actions.updateCollision,
  updateStage3: actions.updateStage3,
  updatePositionNull: actions.updatePositionNull,

};
const mystyle = {
  position: "absolute",
  textTransform: "uppercase",
  fontFamily: "verdana",
  fontSize: "12em",
  fontWeight: "700",
  color: "#E50003",
  textShadow: "1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)",


};

const mystyle2 = {



  position: "absolute",
  textTransform: "uppercase",
  fontFamily: "verdana",
  fontSize: "12em",
  fontWeight: "700",
  color: "#32E306",
  textShadow: "1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)",


};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
