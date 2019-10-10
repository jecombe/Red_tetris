import React, { useState , useEffect} from 'react';

import { createStage, checkCollision } from '../helpers/gameHelpers';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import inputs from '../actions/inputs';
import fallPiece from '../actions/fallPiece';


// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';

// Components
import Stage from './Stage';

import Display from './Display';
import DisplayGameOver from './DisplayGameOver';

import StartButton from './StartButton';
import gameConnection from '../actions/gameConnection';

import startGame from '../actions/startGame';
import getPiece from '../actions/getPiece';


const Tetris = props => {

  console.log('TETRIS ', props)

  

 /*

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  useEffect(() => {
    // piece handler hook
    if (
      !props.game.piece &&
      props.game.boardFix &&
      props.game.gameStatus === 'start'
    )
      props.getPiece(
        props.match.params.room,
        props.match.params.playerName,
        props.game.boardFix,
      );
  });

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };*/


  /*const startGame = () => {
    console.log('test');
    setDropTime(1000);

    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };*/

  /*const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(1000);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };
  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    props.gameConnection(props.match.params.room, 'join');
    return () => {
      props.gameConnection(props.match.params.room, 'leave');
    };
  }, []);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>

        <Stage stage={stage} />
        <aside>
          {gameOver ? <DisplayGameOver text="GAME OVER" /> : (

            <div>

              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={props.startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

Tetris.propTypes = {
  inputs: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  fallPiece: PropTypes.func.isRequired,
  gameConnection: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
*/









const [dropTime, setDropTime] = useState(null);
const [gameOver, setGameOver] = useState(false);

const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
const [stage, setStage] = useStage(player, resetPlayer);



console.log("MP ", props)


  useEffect(() => {
    // piece handler hook
    if (
      !props.game.piece &&
      props.game.boardFix &&
      props.game.gameStatus === 'start'
    )
      props.getPiece(
        props.match.params.room,
        props.match.params.playerName,
        props.game.boardFix,
      );
  });


  useEffect(() => {
    // game connection handler hook
    props.gameConnection(props.match.params.room, 'join');
    return () => {
      props.gameConnection(props.match.params.room, 'leave');
    };
  }, []);


  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };
  useInterval(() => {
    drop();
  }, dropTime);


  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>

        <Stage stage={stage} />
        <aside>
          {gameOver ? <DisplayGameOver text="GAME OVER" /> : (

            <div>

              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={props.startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};


Tetris.propTypes = {
  inputs: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  fallPiece: PropTypes.func.isRequired,
  gameConnection: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};










function mapStateToProps(state) {
 return {
  game: state.game,
};
}
export default connect(
  mapStateToProps,
  { inputs, getPiece, fallPiece, gameConnection, startGame },
)(Tetris);
