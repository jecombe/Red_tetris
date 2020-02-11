import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Stage from './Stage';
import GameStatus from './GameStatus';
import { checkCollision2 } from '../../../server/helpers/gameHelpers';
import { flushUpdate2, updateRows2 } from '../../../server/stage/stage';

import { updateStage2 } from '../../../server/stage/utils';
import { positionTetro } from '../../../server/actions/game';

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

/*const updateStage = (piece, newStage, pos, collided) => {
  console.log('OKOKOKOKOKOKOKOKOKOKOK')
  piece.form.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newStage[y + 0][x + 3] = [
          value,
          `${collided ? 'merged' : 'clear'}`,
        ];
      }
    });
  });
  return newStage;
};
*/
const GameBoard = (props) => {
  const {
    playerName,
    playerRoom,
    playerStage,
    playerNextPiece,
    playerOwner,
    playerGameOver,
    playerDropTime,
    otherNotLosing,
    reqStartGame,
    reqSendPosition,
    position,
    collided,
    piece,
    updatePosition,
    updateCollision,
    updateStage3
  } = props;

  const move = ({ keyCode }) => {
    if (playerGameOver === false) {
      if (keyCode === 40)
      {
        //dropTetro(keyCode)


        if (!checkCollision2(piece, playerStage, { x: 0, y: 1 }, position.x, position.y)) {
     
          console.log('NO COLLISION')
          let newX = position.x + 0;
          let newY = position.y + 1;
          console.log("STAGE : ", playerStage)

          updatePosition({ x: newX, y: newY, playerStage: flushUpdate2(piece, playerStage, newX, newY, collided)})

        }
        else
        {
          console.log('COLLISION')
          updateCollision({playerStage: updateRows2(updateStage2(piece, playerStage, position.x, position.y)),playerRoom: playerRoom})
        }
  }
    }

  };

  /*useInterval(() => {
    if (otherNotLosing > -1) {
      const keyCode = 40;
      reqSendPosition({ keyCode, playerRoom });
    }
  }, playerDropTime);
*/
  const handleSubmitStatus = () =>
  {
    reqStartGame({ playerName, playerRoom });
    //updateStage2(piece, playerStage, position.x, position.y, collided);

  }
  console.log("1 ", position, "2 ", collided, "3 ", playerStage)
  if (piece)
  updateStage3({playerStage: updateStage2(piece, playerStage, positionTetro.x, position.y, collided)})
  //updateStage3(piece, playerStage, position.x, position.y, collided);
  

  //flushUpdate2(piece, playerStage, position.x, position.y, collided )

  return (
    <Grid container justify="center" onKeyDown={(e) => move(e)} tabIndex="0">
      <Grid item xs={6} lg={9} container justify="center" alignItems="center">
        {playerStage && playerStage.length
        && <Stage tabIndex="0" stage={playerStage} />}
      </Grid>
      <Grid item xs={6} lg={3} container justify="center" style={{ height: '30vh' }}>
        {playerNextPiece && playerNextPiece.length
        && <Stage stage={playerNextPiece} /> }
        {playerOwner ? (
          <GameStatus handleSubmit={handleSubmitStatus} />
        ) : (0)}
      </Grid>
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
  otherNotLosing: PropTypes.number.isRequired,
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
  otherNotLosing: state.player.otherNotLosing,
  playerDropTime: state.player.playerDropTime,
  position: state.player.position,
  collided: state.player.collided,
  piece: state.player.piece,
  

});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqSendPosition: actions.reqSendPosition,
  updatePosition: actions.updatePosition,
  updateCollision: actions.updateCollision,
  updateStage3: actions.updateStage3,

};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
