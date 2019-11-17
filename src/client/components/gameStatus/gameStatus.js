import React from 'react';
import style from './gameStatus.css';

const GameStatus = ({ handleSubmit }) => {
  return (
    <div className={style.gameStatus}>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GameStatus;