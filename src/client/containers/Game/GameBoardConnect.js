import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { zoomIn } from 'react-animations';
import Countdown from 'react-countdown-now';
import styled, { keyframes } from 'styled-components';

import {
  flushUpdate, updateRows, updateStage, checkCollision,
} from '../../../shared/stage';
import { rotate } from '../../helpers/gameHelpers';
import actions from '../../actions';
import GameBoard from '../../components/Game/GameBoard';
import GameStart from '../../components/Game/GameStart';

const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const mystyle = {
  position: 'absolute',
  textTransform: 'uppercase',
  fontFamily: 'verdana',
  fontSize: '12em',
  fontWeight: '700',
  color: '#E8B806',
  textShadow: '1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)',
};


const GameBoardConnect = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
    playerOwner,
    playerGameOver,
    playerDropTime,
    reqStartGame,
    startGame,
    position,
    piece,
    updatePosition,
    updateCollision,
    collided,
    playerWin,
  } = props;

  // Renderer callback with condition
  const renderer = ({
    hours, minutes, seconds, completed,
  }) => {
    if (completed) {
    // Render a completed state
      return (
        <GameBoard
          playerName={playerName}
          playerRoom={playerRoom}
          playerStage={playerStage}
          playerNextPiece={playerNextPiece}
          playerOwner={playerOwner}
          playerGameOver={playerGameOver}
          playerDropTime={playerDropTime}
          reqStartGame={reqStartGame}
          position={position}
          piece={piece}
          updatePosition={updatePosition}
          updateCollision={updateCollision}
          collided={collided}
          playerWin={playerWin}
        />
      );
    }
    // Render a countdown
    return (
      <BouncyDiv style={mystyle}>
        <h1>{seconds}</h1>
      </BouncyDiv>
    );
  };

  const dropTetro = () => {
    if (!checkCollision(piece, playerStage, { x: 0, y: 1 }, position.x, position.y)) {
      const newX = position.x + 0;
      const newY = position.y + 1;
      // updatePosition({ x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver, });
      return ({
        x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver,
      });
      // return null;
    } else {
      let playerGameOver = false;
      if (position.y < 1) playerGameOver = true;
      // updatePosition({
      //   x: position.x, y: position.y, playerStage: flushUpdate(piece, playerStage, position.x, position.y, false), piece, collided: true, playerGameOver
      // });
      // return null;
      return ({
        x: position.x, y: position.y, playerStage: flushUpdate(piece, playerStage, position.x, position.y, false), piece, collided: true, playerGameOver,
      });
    }
  };


  const moveTetro = (dir) => {
    if (!checkCollision(piece, playerStage, { x: dir, y: 0 }, position.x, position.y)) {
      const newX = position.x + dir;
      const newY = position.y + 0;

      return ({
        x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, false), piece, collided: false, playerGameOver,
      });
    }
    const newX = position.x + 0;
    const newY = position.y + 0;
    return ({
      x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece, collided: false, playerGameOver,
    });
  };

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
        return null;
      }
    }
    return ({
      x: pos2, y: position.y, playerStage: flushUpdate(clonedPiece, playerStage, pos2, position.y, false), piece: clonedPiece, playerGameOver,
    });
  };

  const moveDownTetro = () => {
    let i = 0;
    let checkColl = false;
    let playerGameOver = false;
    while (checkColl !== true) {
      i += 1;
      checkColl = checkCollision(piece, playerStage, { x: 0, y: i }, position.x, position.y);
      if (checkColl === true) {
        /* --- Check Game Over --- */
        if (position.y < 1) {
          console.log('GAME OVER');
          playerGameOver = true;
        }
        i -= 1;
        break;
      }
      checkColl = checkCollision(piece, playerStage, { x: 0, y: i + 1 }, position.x, position.y);
    }
    const newX = position.x + 0;
    const newY = position.y + i;
    return ({
      x: newX, y: newY, playerStage: flushUpdate(piece, playerStage, newX, newY, true), piece, collided: true, playerGameOver,
    });
  };

  const move = ({ keyCode }) => {
    let payload = null;

    if (playerGameOver === false) {
      if (keyCode === 40) {
        payload = dropTetro();
      } else if (keyCode === 37) {
        payload = moveTetro(-1);
      } else if (keyCode === 39) {
        payload = moveTetro(1);
      } else if (keyCode === 38) {
        payload = moveTetroUp(1);
      } else if (keyCode === 32) {
        payload = moveDownTetro();
      }
      if (payload) updatePosition(payload);
    }
    if (piece && !collided) {
      //* ********** AJOUTE LE OU LES PIECES SUR LA STAGE *************************/
      updateStage(piece, playerStage, position.x, position.y, collided);
    } else if (collided) {
      //* ********** AJOUTE LA PROCHAINE PIECES SUR LA STAGE LORSQU'IL Y A COLLISION *************************/
      const { stage, lineFull } = updateRows(updateStage(piece, playerStage, position.x, position.y, true));
      updateCollision({
        playerStage: stage, playerRoom, x: 10 / 2 - 2, y: 0, lineFull, playerGameOver,
      });
    }
  };

  return (
    <>
      <GameBoard
        playerName={playerName}
        playerRoom={playerRoom}
        playerStage={playerStage}
        playerNextPiece={playerNextPiece}
        playerOwner={playerOwner}
        playerGameOver={playerGameOver}
        playerDropTime={playerDropTime}
        reqStartGame={reqStartGame}
        position={position}
        piece={piece}
        updatePosition={updatePosition}
        updateCollision={updateCollision}
        collided={collided}
        playerWin={playerWin}
        move={move}
      />
    </>
  );
};

// {startGame === true ? (
//   <Countdown
//     date={Date.now() + 5000}
//     renderer={renderer}
//   />
// ) : (
//   <GameStart />
// ) }

GameBoardConnect.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerOwner: PropTypes.bool.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqStartGame: PropTypes.func.isRequired,
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
  startGame: state.player.startGame,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  updatePosition: actions.updatePosition,
  updateCollision: actions.updateCollision,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardConnect);
