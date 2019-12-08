import React from 'react';

const GameStatus = ({ handleSubmit }) => (
  <div style={gameStatusStyle}>
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </div>
);

const gameStatusStyle = {
  border: '1px solid black',
};

export default GameStatus;
