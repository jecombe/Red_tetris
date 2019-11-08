
import React, { useState, useEffect } from 'react';
import useInput from '../containers/customHooks';

function Connexion(props) {
  const room = useInput();
  const userName = useInput();

  return (
    <div className="game-screen">
      <div className="game-title">Red Tetris</div>
    
      <input
        id="userName"
        name="userName"
        placeholder="User Name"
        {...userName}
      />
      <input id="room" name="room" placeholder="Room" {...room} />
      <button
        className="form-button"
        onClick={() => props.history.push(`/#${room.value}[${userName.value}]`)}
      >
        CreateRoom
      </button>
    </div>
  )
}

export default Connexion;