import React, { useState } from 'react';

import { createStage, checkCollision, createStageSmall } from '../helpers/gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { usePlayerSmall } from '../hooks/usePlayerSmall';
import { useStageSmall } from '../hooks/useStageSmall';
import { useInterval } from '../hooks/useInterval';

// Components
import Stage from './Stage';
import StageSmall from './StageSmall';

import Display from './Display';
import DisplayGameOver from './DisplayGameOver';

import StartButton from './StartButton';


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);


  const [player_small, updatePlayerPos_small, resetPlayerSmall] = usePlayerSmall();
  const [stage_small, setStageSmall] = useStageSmall(player_small, resetPlayerSmall);


  console.log('re-render');

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log('test');
    setDropTime(1000);

    // Reset everything
    setStage(createStage());
    resetPlayer();
    setStageSmall(createStage());
    resetPlayerSmall();
    setGameOver(false);
  };

  const drop = () => {
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
        console.log('HAUT');
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
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
