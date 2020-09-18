import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { zoomIn } from 'react-animations';
import Countdown from 'react-countdown-now';
import styled, { keyframes } from 'styled-components';

import {
  flushUpdate, updateRows, updateStage, checkCollision,
} from '../../../shared/stage';
import { move } from '../../helpers/gameHelpers';
import actions from '../../actions';
import GameBoard from '../../components/Game/GameBoard';

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
    position,
    piece,
    updatePosition,
    updateCollision,
    collided,
    playerWin,
    reqMoveTetro
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

  const printTetroStage = () => {
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
  };// <BouncyDiv><h1 style={mystyle}>GAME OVER</h1></BouncyDiv>

  useEffect(() => {
    printTetroStage();
  });

  // printTetroStage();

  const reqMove = ({ keyCode }) => {
    const payload = move(keyCode, playerGameOver, piece, playerStage, position);

    if (payload) updatePosition(payload);

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
    <GameBoard
      playerStage={playerStage}
      playerNextPiece={playerNextPiece}
      playerGameOver={playerGameOver}
      playerDropTime={playerDropTime}
      playerWin={playerWin}
      move={reqMove}
    />
  );
};

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
  reqMoveTetro: actions.reqMoveTetro,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardConnect);
