import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameBoard from '../../components/Game/GameBoard';
import { checkCollision2 } from '../../../server/helpers/gameHelpers';
import { flushUpdate2, updateRows2 } from '../../../server/stage/stage';
import { updateStage } from '../../actions/player';
import { updateStage2 } from '../../../server/stage/utils';

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

const GameBoardConnect = (props) => {
  const {
    playerRoom,
    playerStage,
    playerNextPiece,
    otherNotLosing,
    playerDropTime,
    playerGameOver,
    reqSendPosition,
    actualPiece,
    updatePosition,
    x,
    y,
    setStage,
    collided,
    updateCollision,

  } = props;

  /*useInterval(() => {
    if (otherNotLosing > -1) {
      const keyCode = 40;
      reqSendPosition({ keyCode, playerRoom });
    }
  }, playerDropTime);*/
  console.log("PIECE =======================================+++++++++++> ", playerStage)

  const dropTetro = (keyCode) => {
    if (!checkCollision2(actualPiece, playerStage, { px: 0, py: 1 }, x, y)) {
      console.log("NO COLLISION")
      //this.setPosition(0, 1);
     /* x = x + 0;
      y = y + 1;*/
     // updatePosition()
   // reqSendPosition({x, y});
     // update(flushUpdate2(actualPiece, playerStage, x, y))
      //playerStage = flushUpdate2(actualPiece, playerStage, x, y);
    /*else {

      if (this.pos.y < 1) {
        this.setLosing(true);
        if (!this.peopleSpectre.length) {
          this.setNoLosing2();
        }
      }
      this.setIndex(this.index + 1);
      this.setStage(updateStagingBeforeCollision(this, game, redGame));
      
      if (this.peopleSpectre.length) {
        dispatchStage2(this, redGame.socketServer, game);
      }
      this.setPiece(game.tetro[this.index]);
      if (!game.tetro[this.index + 1]) game.setTetro();
      this.setStage(updateStagingAfterCollision(this.piece, this));
      this.setNextPiece(flushUpdate(game.tetro[this.index + 1], this, createStagePiece()));
    }*/
  }
}

  const move = ({ keyCode }) => {
    if (playerGameOver === false) {
      if (keyCode === 40)
      {
        //dropTetro(keyCode)
        console.log(actualPiece)

        if (!checkCollision2(actualPiece, playerStage, { x: 0, y: 1 }, x, y)) {
        
        //console.log('OKOKOKOk', actualPiece, playerStage, x, y)

         // console.log('OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK')
          //this.setPosition(0, 1);
         /* x = x + 0;
          y = y + 1;*/
          console.log('NO COLLISION')
          let newX = x + 0;
          let newY = y + 1;
          /*playerStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)))
            actualPiece.form.shape.forEach((row, fy) => {
              row.forEach((value, fx) => {
                if (value !== 0) {
                  playerStage[fy + newY][fx + newX] = [
                    value,
                    `${collided ? 'merged' : 'clear'}`,
                  ];
                }
              });
            });*/
            
            
          updatePosition({ x: newX, y: newY, playerStage: flushUpdate2(actualPiece, playerStage, newX, newY, collided)})
          //setStage({stage: playerStage})
          //setStage(updateStage2(actualPiece, playerStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))), x, y, collided))
        //reqSendPosition({x, y});
        }
        else
        {
          console.log('COLLISION')
          updateCollision({playerStage: updateRows2(updateStage2(actualPiece, playerStage, x, y)),playerRoom: playerRoom})
        }
           // reqSendPosition({ keyCode, playerRoom });
  }
      //reqSendPosition({ keyCode, playerRoom });
    }
  };

  return (
    <GameBoard
      playerStage={playerStage}
      playerNextPiece={playerNextPiece}
      move={move}
    />
  );
};

GameBoardConnect.propTypes = {
  playerRoom: PropTypes.string.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  otherNotLosing: PropTypes.number.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  reqSendPosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerRoom: state.player.playerRoom,
  playerStage: state.player.playerStage,
  playerNextPiece: state.player.playerNextPiece,
  playerGameOver: state.player.playerGameOver,
  otherNotLosing: state.player.otherNotLosing,
  playerDropTime: state.player.playerDropTime,
  actualPiece: state.player.actualPiece,
  x: state.player.x,
  y: state.player.y,
  collided: state.player.collided,
 
});

const mapDispatchToProps = {
  reqSendPosition: actions.player.reqSendPosition,
  updatePosition: actions.player.updatePosition,
  setStage: actions.player.setStage,
  updateCollision: actions.player.updateCollision,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardConnect);
