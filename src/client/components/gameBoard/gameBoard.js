import React from 'react';
import style from './gameBoard.css';

const GameBoard = ({ handleSubmit }) => {
  return (
    <div className={style.gameBoard}>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GameBoard;