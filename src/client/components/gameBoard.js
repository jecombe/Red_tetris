import React from 'react';

const GameBoard = ({ handleSubmit }) => {
  return (
    <div style={GameBoardStyle}>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const GameBoardStyle = {
    border: '1px solid yellow'
}

export default GameBoard;